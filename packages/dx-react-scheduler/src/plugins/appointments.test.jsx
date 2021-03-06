import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import { createClickHandlers } from '@devexpress/dx-core';
import { Appointments } from './appointments';

const Appointment = () => null;

const defaultProps = {
  appointmentComponent: Appointment,
};

jest.mock('@devexpress/dx-core', () => ({
  ...require.requireActual('@devexpress/dx-core'),
  createClickHandlers: jest.fn(),
}));

const defaultDeps = {
  template: {
    appointment: {
      type: 'horizontal',
      appointment: {
        title: 'a',
        endDate: '2018-07-05',
        startDate: '2018-07-06',
      },
      onClick: 'onClick',
      onDoubleClick: 'onDoubleClick',
      style: {
        height: 150,
        width: '60%',
        transform: 'translateY(10px)',
        left: '20%',
        position: 'absolute',
      },
    },
  },
};

describe('Appointments', () => {
  beforeEach(() => {
    createClickHandlers.mockImplementation((click, dblClick) => ({
      onClick: click,
      onDoubleClick: dblClick,
    }));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render appointments', () => {
    const appointment = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    )).find(Appointment);

    const {
      appointment: appointmentData,
      style, type,
    } = appointment.props();

    expect(appointment).toHaveLength(1);
    expect(type).toBe('horizontal');
    expect(style).toEqual({
      height: 150,
      width: '60%',
      transform: 'translateY(10px)',
      left: '20%',
      position: 'absolute',
    });
    expect(appointmentData.title).toBe('a');
    expect(appointmentData.endDate).toBe('2018-07-05');
    expect(appointmentData.startDate).toBe('2018-07-06');
  });

  it('should pass correct event handlers', () => {
    const appointment = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Appointments
          {...defaultProps}
        />
      </PluginHost>
    )).find(Appointment);

    expect(createClickHandlers)
      .toHaveBeenCalledWith(
        defaultDeps.template.appointment.onClick,
        defaultDeps.template.appointment.onDoubleClick,
      );

    const {
      onClick, onDoubleClick,
    } = appointment.props();

    expect(onClick).toBe('onClick');
    expect(onDoubleClick).toBe('onDoubleClick');
  });
});
