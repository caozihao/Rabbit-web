
const commonModels = () => {
  return [
  ];
};

export default [
  {
    path: '/',
    models: () => [
      ...commonModels()],
    page: () => import('./routes/IndexPage.jsx'),
  },
  {
    path: '/products',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/Products.jsx'),
  },
];
