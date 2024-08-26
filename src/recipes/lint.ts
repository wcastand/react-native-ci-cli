import { CycliRecipe, CycliToolbox, ProjectContext, RunResult } from '../types'
import { join } from 'path'
import { FLAG as PRETTIER_FLAG } from './prettier'

const FLAG = 'lint'

const existsEslintConfiguration = (toolbox: CycliToolbox): boolean =>
  Boolean(toolbox.projectConfig.packageJson().eslintConfig) ||
  Boolean(
    toolbox.filesystem
      .list()
      ?.some(
        (f) => f.startsWith('.eslintrc.') || f.startsWith('eslint.config.')
      )
  )

const execute =
  () => async (toolbox: CycliToolbox, context: ProjectContext) => {
    toolbox.interactive.vspace()
    toolbox.interactive.sectionHeader('Genereating ESLint workflow')

    // eslint@9 introduces new configuration format that is not supported by widely used plugins yet,
    // so we stick to ^8 for now.
    await toolbox.dependencies.addDev('eslint', context, { version: '^8' })
    await toolbox.dependencies.addDev('@react-native/eslint-config', context)

    const withPrettier =
      context.selectedOptions.includes(PRETTIER_FLAG) ||
      toolbox.dependencies.existsDev('prettier') ||
      toolbox.dependencies.exists('prettier')

    if (withPrettier) {
      await toolbox.dependencies.addDev('eslint-plugin-prettier', context)
      await toolbox.dependencies.addDev('eslint-config-prettier', context)
    }

    await toolbox.scripts.add('lint', 'eslint "**/*.{js,jsx,ts,tsx}"')

    if (!existsEslintConfiguration(toolbox)) {
      await toolbox.template.generate({
        template: join('lint', '.eslintrc.json.ejs'),
        target: '.eslintrc.json',
        props: {
          withPrettier,
        },
      })

      toolbox.interactive.step(
        'Created .eslintrc.json with default configuration.'
      )
    }

    await toolbox.workflows.generate(join('lint', 'lint.ejf'), context)

    toolbox.interactive.success('Created ESLint workflow.')

    return `--${FLAG}`
  }

const run = async (
  toolbox: CycliToolbox,
  context: ProjectContext
): Promise<RunResult> => {
  if (toolbox.options.isRecipeSelected(FLAG)) {
    context.selectedOptions.push(FLAG)
    return execute()
  }

  if (toolbox.options.isPreset()) {
    return null
  }

  const proceed = await toolbox.interactive.confirm(
    'Do you want to run ESLint check on every PR?',
    { type: 'normal' }
  )

  if (!proceed) {
    return null
  }

  context.selectedOptions.push(FLAG)
  return execute()
}

export const recipe: CycliRecipe = {
  meta: {
    flag: FLAG,
    description: 'Generate ESLint workflow to run on every PR',
  },
  run,
}

export default recipe
