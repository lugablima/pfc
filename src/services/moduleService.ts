import { EditModulePayload, GetAllModules, ModulePayload, TModule } from "../types/moduleTypes";
import * as moduleRepository from "../repositories/moduleRepository";
import * as classRepository from "../repositories/classRepository";
import * as errorHandling from "../errors/errorHandling";
import * as classService from "./classService";
import { prisma } from "../config/prisma";
import { ClassPayload } from "../types/classTypes";
import * as moment from "moment";

async function validateModuleNameConflict(module: ModulePayload, moduleId?: string) {
  let registeredModule: TModule | null;

  if (moduleId) {
    registeredModule = await moduleRepository.findOneByName(module.name, moduleId);
  } else {
    registeredModule = await moduleRepository.findOneByName(module.name);
  }

  if (registeredModule) {
    throw errorHandling.conflict(`A module named '${registeredModule.name}' already exists.`);
  }
}

async function validateClassNameConflictInModule(module: ModulePayload) {
  const classesObj: { [key: string]: boolean } = {};

  // eslint-disable-next-line no-return-assign
  module.classes.forEach((_class) => (classesObj[_class.name.toLowerCase()] = true));

  if (Object.keys(classesObj).length !== module.classes.length) {
    throw errorHandling.badRequest(`There are classes with repeated names in the request.`);
  }
}

export async function validateClass(_class: ClassPayload) {
  await classService.validateDueDate(_class);
}

async function validateIfModuleIsEnabledOrDisabled(moduleId: string, isEnabledTarget: boolean) {
  const module = await moduleRepository.findOneByIdAndIsEnabled(moduleId, isEnabledTarget);
  const enabledOrDisabled = isEnabledTarget ? "enabled" : "disabled";

  if (module) {
    throw errorHandling.conflict(`Module is already ${enabledOrDisabled}`);
  }
}

export async function validateClassId(classId: string, moduleId: string) {
  const classFounded = await classRepository.findOneByIdAndModuleId(classId, moduleId);

  if (!classFounded) {
    throw errorHandling.notFound(`There is no class with the ID ${classId} in this module.`);
  }
}

export async function create(module: ModulePayload) {
  await validateModuleNameConflict(module);

  await validateClassNameConflictInModule(module);

  await prisma.$transaction(async (tx) => {
    const { id: moduleId } = await tx.module.create({
      data: {
        name: module.name,
        description: module.description,
        imageUrl: module.imageUrl,
      },
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const _class of module.classes) {
      // eslint-disable-next-line no-await-in-loop
      await validateClass({ ..._class, moduleId });

      // eslint-disable-next-line no-await-in-loop
      await classRepository.insertOne({ ..._class, moduleId, dueDate: moment.parseZone(_class.dueDate).toDate() }, tx);
    }
  });
}

export async function edit(module: EditModulePayload, moduleId: string) {
  await classService.validateModuleId(moduleId);

  if (module.name) {
    await validateModuleNameConflict(module as ModulePayload, moduleId);
  }

  if (module.classes) {
    await validateClassNameConflictInModule(module as ModulePayload);
  }

  await prisma.$transaction(async (tx) => {
    await tx.module.update({
      where: { id: moduleId },
      data: {
        name: module.name,
        description: module.description,
        imageUrl: module.imageUrl,
      },
    });

    if (!module.classes) return;

    // eslint-disable-next-line no-restricted-syntax
    for (const _class of module.classes) {
      // eslint-disable-next-line no-await-in-loop
      await validateClass({ ..._class, moduleId });

      // eslint-disable-next-line no-await-in-loop
      await validateClassId(_class.id, moduleId);

      // eslint-disable-next-line no-await-in-loop
      await classService.validateClassNameConflictInModule(
        {
          name: _class.name,
          dueDate: _class.dueDate,
          imageUrl: _class.imageUrl,
          moduleId,
          summaryUrl: _class.summaryUrl,
          videoUrl: _class.videoUrl,
        },
        _class.id,
      );

      // eslint-disable-next-line no-await-in-loop
      await classRepository.updateOne({ ..._class, moduleId, dueDate: moment.parseZone(_class.dueDate).toDate() }, tx);
    }
  });
}

export async function getAll(): Promise<GetAllModules[] | null> {
  const modules = await moduleRepository.getAll();

  return modules;
}

export async function getModuleInfoForEdit(moduleId: string) {
  await classService.validateModuleId(moduleId);

  const module = await moduleRepository.getModuleInfoForEdit(moduleId);

  return module;
}

export async function enableOrDisable(moduleId: string, isEnabledTarget: boolean): Promise<void> {
  await classService.validateModuleId(moduleId);

  await validateIfModuleIsEnabledOrDisabled(moduleId, isEnabledTarget);

  await moduleRepository.updateOneIsEnabled(moduleId, isEnabledTarget);
}

export async function deleteOne(moduleId: string): Promise<void> {
  await classService.validateModuleId(moduleId);

  await moduleRepository.deleteOne(moduleId);
}
