export default routesConfig = [
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      private: true,
      children: [
        {
          path: 'overview',
          element: <Overview />,
        },
        {
          path: 'settings',
          element: <Settings />,
        },
      ],
    },
];

