export default function BuildingsLayout({children}: {
    children: React.ReactNode;
}) {
    return <div className="flex flex-col gap-4 py-8 md:py-2">
        <div className="inline-block justify-center">{children}</div>
    </div>;
}