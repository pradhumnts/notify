import { capitalCase } from 'change-case';
import { useState } from 'react';

import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../_mock';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

UserAccount.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserAccount() {

  return (
    <Page title="User: Account Settings">
        <h2>User Account Page</h2>
    </Page>
  );
}
