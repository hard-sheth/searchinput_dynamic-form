import * as React from 'react'

export type NormalDropdownProp = {
    title: React.ReactNode;
    listoroptions: React.ReactNode;
    dropDownHeigth?: number;
    dropDowntheme?: 'light' | 'dark';
};
function NormalDropdown({ title, listoroptions, dropDownHeigth = 250, dropDowntheme = 'light' }: NormalDropdownProp) {
    const [showOptions, setShowOptions] = React.useState(false);
    const ref: any = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return (
        <div className="position-relative">
            <div className='w-100' onClick={() => setShowOptions(!showOptions)}>
                {title}
            </div>
            {showOptions && <div
                className={`position-absolute p-0 rounded mt-2 ${dropDowntheme === 'light' ? 'bg-white' : 'bg-dark'} border border-1 z-1 container-fluid`}
                style={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    maxHeight: `${dropDownHeigth}px`,
                    color: dropDowntheme === 'dark' ? '#8A94AD' : '#000',
                    borderColor: dropDowntheme === 'dark' ? '#0F111A' : '#CACEDA'
                }}
                ref={ref}
            >
                {listoroptions}
            </div>}

        </div>
    )
}

export { NormalDropdown }