import React from 'react';
import { useParams } from 'react-router-dom';

const DynamicRoute: React.FC = () => {
  const params = useParams();

  return <>id: {params.id}</>;
};

export default DynamicRoute;
