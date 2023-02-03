export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  // here we define the characteristic of the different fields
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hostpot: true,
      },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'handle',
      title: 'handle',
      type: 'handle',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    },
    {
      title: 'Category',
      name: 'category',
      type: 'string',
    },
  ],
}
