export default {
  name: 'product',
  type: 'document',
  title: 'product',
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
        typ
    }
  ],
}
