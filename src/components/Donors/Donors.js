import { useState } from 'react';
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
  Pagination
} from 'react-crud-table';

import * as donorAPI from '../../api/donor.js';

import './styles.css';

const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === 'id') {
    sorter = data.direction === 'ascending' ?
      SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter = data.direction === 'ascending' ?
      SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let donors = [
  {
    id: 1,
    title: 'Create an example',
    description: 'Create an example of how to use the component',
  },
  {
    id: 2,
    title: 'Improve',
    description: 'Improve the component!',
  },
];

const service = {
  fetchItems: payload => {

    const { activePage, itemsPerPage } = payload.pagination;
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    let result = Array.from(donors);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result.slice(start, end));
  },
  fetchTotal: payload => {

    return Promise.resolve(donors.length);
  }
};

function Donors() {

  return (
    <div className="donors">
      <div className="container">
        <CRUDTable 
          caption="Donors"
          fetchItems={payload => service.fetchItems(payload)}>
          <Fields>
            <Field name="id" label="Id" hideInCreateForm readOnly />
            <Field name="name" label="Name" placeholder="Name" />
            <Field name="email" label="Email" placeholder="Email"/>
            <Field name="cpf" label="CPF" placeholder="CPF" />
            <Field name="birth_date" label="Birth Date" placeholder="Birth Date" />
            <Field name="donation_interval" label="Don. Interval" placeholder="Donation Interval" />
            <Field name="phone_number" label="Phone" placeholder="Phone Number"/>
            <Field name="public_place" label="Public Place" placeholder="Public Place" />
            <Field name="zip_code" label="Zip-Code" placeholder="Zip Code"/>
            <Field name="complement" label="Complement" placeholder="Complement"/>
            <Field name="city" label="City" placeholder="City" />
            <Field name="state" label="State" placeholder="State"/>
            <Field name="created_at" label="Created at" placeholder="Created at"/>
            <Field name="actions" label="Actions" placeholder="Actions"/>
          </Fields>
          <Pagination
            itemsPerPage={10}
            fetchTotalOfItems={payload => service.fetchTotal(payload)}
          />
          <CreateForm
            title="Donor Creation"
            message="Create a new donor!"
            trigger="Create Donor"
            onSubmit={donor => service.create(donor)}
            submitText="Create"
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                errors.title = 'Please, provide donor\'s title';
              }

              if (!values.description) {
                errors.description = 'Please, provide donor\'s description';
              }

              return errors;
            }}
          />

          <UpdateForm
            title="donor Update Process"
            message="Update donor"
            trigger="Update"
            onSubmit={donor => service.update(donor)}
            submitText="Update"
            validate={(values) => {
              const errors = {};

              if (!values.id) {
                errors.id = 'Please, provide id';
              }

              if (!values.name) {
                errors.name = 'Please, provide donor\'s name';
              }

              if (!values.email) {
                errors.email = 'Please, provide donor\'s email';
              }

              return errors;
            }}
          />

          <DeleteForm
            title="donor Delete Process"
            message="Are you sure you want to delete the donor?"
            trigger="Delete"
            onSubmit={donor => service.delete(donor)}
            submitText="Delete"
            validate={(values) => {
              const errors = {};
              if (!values.id) {
                errors.id = 'Please, provide id';
              }
              return errors;
            }}
         />
        </CRUDTable>
      </div>
    </div>
  );
}

export default Donors;