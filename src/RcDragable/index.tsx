import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { MenuOutlined } from '@ant-design/icons';
import './index.less';

const SortableItem = SortableElement(({ value }) => (
  <div className="drag-item-wrapper">
    <input type="text" defaultValue={value} />
    <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
  </div>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <div className="drag-wrapper">
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </div>
  );
});

class SortableComponent extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

export default SortableComponent;
