import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template,
} from '@devexpress/dx-react-core';
import { createClickHandlers } from '@devexpress/dx-core';

export class Appointments extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Appointment,
    } = this.props;

    return (
      <Plugin name="Appointments">
        <Template
          name="appointment"
        >
          {({ onClick, onDoubleClick, ...params }) => (
            <Appointment
              {...params}
              {...createClickHandlers(onClick, onDoubleClick)}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

Appointments.propTypes = {
  appointmentComponent: PropTypes.func.isRequired,
};

Appointments.components = {
  appointmentComponent: 'Appointment',
};
