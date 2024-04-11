import React from "react";

export default function Header() {
    return (
        <div className="max-w-2xl mx-auto w-full py-8 border-2">
            <a href="/" className="inline-block">Home</a>
            <span className="inline-block px-8 border-2">/</span>
            <a href="/transfer" className="inline-block">Transfer</a> 
        </div>
    );
}
