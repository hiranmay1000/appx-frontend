import React from 'react';
import { Button } from '../../ui';
import { Link } from 'react-router-dom';

const Error: React.FC = () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            Go back to <Link to="/">
            <Button>Home</Button>
      </Link>
        </div>
    );
}

export default Error;