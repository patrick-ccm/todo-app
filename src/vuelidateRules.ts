import { required, helpers } from "@vuelidate/validators"

const mustBeVue = (value: string) => value.includes("vue")
const alphaNumSpace = helpers.regex(/^[\w\-\s]+$/)

export const rules = {
  todoName: {
    mustBeVue: helpers.withMessage("Task name must have vue in it", mustBeVue),
    alphaNumSpace: helpers.withMessage("No symbols", alphaNumSpace),
  },
  isComplete: { required },
}
