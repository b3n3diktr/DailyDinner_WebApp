import React from 'react';

type LinkProps = {
    href: string;
    targetBlank: boolean;
    children: React.ReactNode | string;

}

export default function Link({href, targetBlank = false, children}: LinkProps) {
    return(
        <a
        className="App-link"
        href={href}
        target={targetBlank ? "_blank" : ""}
        rel={targetBlank ? "noopener noreferrer" : ""}
    >
            {children}
    </a>
    );
}