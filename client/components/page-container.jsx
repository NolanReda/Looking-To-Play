import React from 'react';

const styles = {
  page: {
    minHeight: 'calc(100vh - 3.5rem'
  }
};

export default function PageContainer({ children }) {
  return (
    <div className='page-container'>
      <div className='container-fluid just-cent' style={styles.pages}>
        { children }
      </div>
    </div>
  );
}
