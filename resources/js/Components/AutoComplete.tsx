//./components/Autocomplete.tsx

import classNames from "classnames";
import React, { memo, useEffect, useRef, useState } from "react";

type Props = {
    items: string[];
    value: string;
    onChange(val: string): void;
};

//we are using dropdown, input and menu component from daisyui
const Autocomplete = (props: Props) => {
    const { items, value, onChange } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const handleOutsideClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    });
    return (
        <div
            // use classnames here to easily toggle dropdown open
            className="w-full realative"
            ref={ref}
        >
            <input
                type="text"
                className="input input-bordered w-full"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onClick={(e) => setOpen(true)}
                placeholder="Type something.."
                tabIndex={0}
            />
            {/* add this part */}
            {open && <div className="bg-base-200 max-h-96 overflow-auto flex-col rounded-md absolute z-1">
                <ul
                    className="menu menu-compact"
                    // use ref to calculate the width of parent
                    style={{ width: ref.current?.clientWidth }}
                >
                    {items.map((item, index) => {
                        return (
                            <li
                                key={index}
                                tabIndex={index + 1}
                                onClick={() => {
                                    onChange(item);
                                    setOpen(false);

                                }}
                                className="border-b border-b-base-content/10 w-full"
                            >

                                <button>{item}</button>
                            </li>
                        );
                    })}
                </ul>
                {/* add this part */}
            </div>}
        </div>
    );
};

export default Autocomplete;
