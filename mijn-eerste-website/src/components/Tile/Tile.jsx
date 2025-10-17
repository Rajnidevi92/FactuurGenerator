import {Link} from "react-router-dom";
import Button from "../Button/Button";
import styles from "./Tile.module.css";

/**
 * Tile component
 * variant: "primary" | "secondary"
 * - primary → heldergroen (home)
 * - secondary → neutraal grijs (dashboard)
 */

export default function Tile({
                                 variant = "primary",
                                 title,
                                 text,
                                 btnText,
                                 linkTo,
                                 icon,
                                 onClick,
                             }) {
    const isLink = !!linkTo;

    return (
        <div
            className={`${styles.tile} ${
                variant === "primary" ? styles["tile--primary"] : styles["tile--secondary"]
            }`}
        >
            {icon && <img src={icon} alt={title} className={styles.tile__icon}/>}

            <h2 className={styles.tile__title}>{title}</h2>
            <p className={styles.tile__text}>{text}</p>

            {isLink ? (
                <Button as="link" to={linkTo} variant="primary">
                    {btnText}
                </Button>
            ) : (
                <Button variant="primary" onClick={onClick}>
                    {btnText}
                </Button>
            )}
        </div>
    );
}
