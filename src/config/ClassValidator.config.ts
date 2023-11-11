import { plainToClass, ClassConstructor } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export class ClassValidatorConfig {
    public async validate (dto: ClassConstructor<unknown>, body: unknown) {
        const plainClass = plainToClass(dto, body);
        const errors = await validate(Object(plainClass));

        const errorsFiltered = this.errors(errors);

        return errorsFiltered;
    }

    private async errors(errors: ValidationError[]) {
        const constraints: string[][] = [];
      
        if (errors.length > 0) {
            errors.map(err => {
                constraints.push(err.constraints ? Object.values(err.constraints): []);
            });
        }

        const concatInOneArray: string[] = [];

        for(const i in constraints) {
            concatInOneArray.push(constraints[i][0]);
        }

        const errorsArray: string[] = [];
        
        for (const i in concatInOneArray) {
            errorsArray.push(concatInOneArray[i]);
        }

        return { errors: errorsArray };
    }
}
