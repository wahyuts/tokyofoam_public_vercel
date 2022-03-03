import React, { useRef } from 'react';
import Styles from './Dropdown.module.css';

const clickOutsideRef = (content_ref, toggle_ref) => {
    document.addEventListener('mousedown', (e) => {
        // user click toggle
        if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
            content_ref.current.classList.toggle('active');
        } else {
            // user click outside toggle and content
            if (content_ref.current && !content_ref.current.contains(e.target)) {
                content_ref.current.classList.remove('active');
            }
        }
    });
};

const Dropdown = (props) => {
    const dropdown_toggle_el = useRef(null);
    const dropdown_content_el = useRef(null);

    clickOutsideRef(dropdown_content_el, dropdown_toggle_el);

    return (
        <div className={Styles.Dropdown}>
            <button ref={dropdown_toggle_el} className={Styles.DropdownToggle}>
                {props.icon ? <i className={props.icon}></i> : ''}
                {props.badge ? <span className={Styles.DropdownToggleBadge}>{props.badge}</span> : ''}
                {props.customToggle ? props.customToggle() : ''}
            </button>
            <div ref={dropdown_content_el} className={Styles.DropdownContent}>
                {props.contentData && props.renderItems
                    ? props.contentData.map((item, index) => props.renderItems(item, index))
                    : ''}
                {props.renderFooter ? <div className={Styles.DropdownFooter}>{props.renderFooter()}</div> : ''}
            </div>
        </div>
    );
};

export default Dropdown;
