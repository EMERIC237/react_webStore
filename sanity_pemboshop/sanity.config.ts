import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'pemboShop',

  projectId: '9m1hjh3n',
  dataset: 'production',
  basePath: 'pemboShopStore',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
