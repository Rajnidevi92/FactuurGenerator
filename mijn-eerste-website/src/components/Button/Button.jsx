import { Link } from "react-router-dom";
import styles from "./Button.module.css";

/**
 * Button component
 * variant: "primary" | "secondary" | "outline"
 * as: "button" | "link"
 */

export default function Button({
                                   variant = "primary",
                                   as = "button",
                                   to,
                                   onClick,
                                   children,
                                   ...props
                               }) {
    const classNames = `${styles.btn} ${styles[`btn--${variant}`]}`;

    if (as === "link" && to) {
        return (
            <Link to={to} className={classNames} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classNames} onClick={onClick} {...props}>
            {children}
        </button>
    );
}
