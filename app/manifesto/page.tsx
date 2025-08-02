
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Manifesto | Harry Chang',
    description: 'My personal manifesto.',
};

export default function ManifestoPage() {
    return (
        <div className="container pt-24 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Manifesto</h1>
            <p>This is the manifesto page. Content will be added here soon.</p>
        </div>
    );
}
