import React from 'react';
import { Header } from './Header';
import PropTypes from 'prop-types';
import { RefreshProvider } from '../contexts/RefreshContext';
import { useState } from 'react';

const Layout = ({ children }) => {
  return (
    <RefreshProvider>
      <Header />
      <div className="layout">{children}</div>
      <style jsx global>{`
        body {
          margin: 0;
          font-size: 16px;
          font-family: Helvetica, Arial, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol';
        }
      `}</style>
      <style jsx>{`
        .layout {
          padding: 0 2rem;
        }
      `}</style>
    </RefreshProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;