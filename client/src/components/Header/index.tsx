
type Props = {
    name: string;
    buttonComponent?: any;
    isSmallText?: boolean;
}

const Header = ({
    name,
    buttonComponent,
    isSmallText = false
}: Props) => {
    return (
        <div className="mb-5 justify-between flex w-full items-center ">
            <h1 className={`${isSmallText ? 'text-lg' : 'text-2xl'} text-black px-2 font-semibold dark:text-white`}>
                {name}
            </h1>
            {buttonComponent}
        </div>
    )
}

export default Header