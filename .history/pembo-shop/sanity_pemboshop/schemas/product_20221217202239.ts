export default {
  name: 'product',
  type: 'document',
  title: 'product',
  // here we define the characteristic of the different field
  fields: [
    {
      name: 'Image',
      title: 'string',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hostpot: true,
      }
    },
    {
        name: 'name',
        title: 'Name',
        type: 'string'
    }
  ],
}
