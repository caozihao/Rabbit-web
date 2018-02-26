
const commonModels = () => {
  return [
  ];
};

export default [
  {
    path: '/',
    models: () => [
      ...commonModels()],
    page: () => import('./routes/main/MainContainer.jsx'),
  },
  {
    path: '/find',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/find/FindContainer.jsx'),
  },
  {
    path: '/receive',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/receive/ReceiveContainer.jsx'),
  },
];
