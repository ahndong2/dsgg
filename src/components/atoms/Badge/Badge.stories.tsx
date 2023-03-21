import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Badge } from './Badge';

export default {
  title: 'Atoms/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const State = () => {
  return (
    <>
      <div className="mb-5">
        <Badge content="상품 이용 중" />
      </div>
      <div className="space-x-5">
        <Badge content="요청" />
        <Badge content="완료" theme="positive" />
        <Badge content="반려" theme="negative" />
      </div>
    </>
  );
};

export const Count = () => {
  return (
    <div className="space-x-5">
      <Badge variant="count" content={1} />
      <Badge variant="count" content={1} theme="negative" />
    </div>
  );
};
Count.parameters = {
  backgrounds: { default: 'gray' },
};

export const Dot = Template.bind({});
Dot.args = {
  variant: 'dot',
  dot: true,
  children: <div className="w-10 h-10 bg-gray-7" />,
};

export const Alarm = Template.bind({});
Alarm.args = {
  variant: 'alarm',
  content: 1,
  children: <div className="w-10 h-10 bg-gray-7" />,
};
