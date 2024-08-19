export function Feature({text, icon}) {
    return (
        <div className="basis-1/4 text-white text-center px-5 flex flex-col gap-8">
            <div>{icon}</div>
            <p>
                {text}
            </p>
        </div>

    )
}