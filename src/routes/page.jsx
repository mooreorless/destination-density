import React from 'react';

export const Page = props => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <title>Sample Project Name</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/flatly/bootstrap.min.css" />
    </head>
    <body>
      {props.children}
    </body>
  </html>
);

export default Page;
