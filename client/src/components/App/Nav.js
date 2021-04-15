import axios from "../../axios";
import { useState, useEffect } from "react";
import { getLoggedUser } from "../../store/actions";

export default function Navigation() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state);

    useEffect(() => dispatch(getLoggedUser()), []);

    const showRejectButton = incoming && !accepted;

    return (
        <div>
            <button onClick={onClick} id="btn">
                {buttonText}
            </button>
            <br></br>
            {showRejectButton && (
                <button onClick={onRejectButton} id="btn">
                    Reject request
                </button>
            )}
        </div>
    );
}
