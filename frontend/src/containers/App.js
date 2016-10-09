import React from 'react';
import MenuBar from '../components/MenuBar';
import ItemList from '../components/ItemList';

export default function App({ data }) {
  return (
    <div>
      <MenuBar />
      <ItemList />
    </div>
  );
}
