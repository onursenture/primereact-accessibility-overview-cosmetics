import * as React from 'react';
import { Tooltip } from '../tooltip/Tooltip';
import { classNames, ObjectUtils } from '../utils/Utils';
import { SelectButtonItem } from './SelectButtonItem';

export const SelectButton = React.memo(React.forwardRef((props, ref) => {
    const elementRef = React.useRef(null);

    const onOptionClick = (event) => {
        if (props.disabled || isOptionDisabled(event.option)) {
            return;
        }

        let selected = isSelected(event.option);
        if (selected && !props.unselectable) {
            return;
        }

        let optionValue = getOptionValue(event.option);
        let newValue;

        if (props.multiple) {
            let currentValue = props.value ? [...props.value] : [];
            newValue = selected ? currentValue.filter((val) => !ObjectUtils.equals(val, optionValue, props.dataKey)) : [...currentValue, optionValue];
        }
        else {
            newValue = selected ? null : optionValue;
        }

        if (props.onChange) {
            props.onChange({
                originalEvent: event.originalEvent,
                value: newValue,
                stopPropagation: () => { },
                preventDefault: () => { },
                target: {
                    name: props.name,
                    id: props.id,
                    value: newValue,
                }
            });
        }
    }

    const getOptionLabel = (option) => {
        return props.optionLabel ? ObjectUtils.resolveFieldData(option, props.optionLabel) : (option && option['label'] !== undefined ? option['label'] : option);
    }

    const getOptionValue = (option) => {
        return props.optionValue ? ObjectUtils.resolveFieldData(option, props.optionValue) : (option && option['value'] !== undefined ? option['value'] : option);
    }

    const isOptionDisabled = (option) => {
        if (props.optionDisabled) {
            return ObjectUtils.isFunction(props.optionDisabled) ? props.optionDisabled(option) : ObjectUtils.resolveFieldData(option, props.optionDisabled);
        }

        return (option && option['disabled'] !== undefined ? option['disabled'] : false);
    }

    const isSelected = (option) => {
        let optionValue = getOptionValue(option);

        if (props.multiple) {
            if (props.value && props.value.length) {
                return props.value.some((val) => ObjectUtils.equals(val, optionValue, props.dataKey));
            }
        }
        else {
            return ObjectUtils.equals(props.value, optionValue, props.dataKey);
        }

        return false;
    }

    const createItems = () => {
        if (props.options && props.options.length) {
            return props.options.map((option, index) => {
                const isDisabled = props.disabled || isOptionDisabled(option);
                const optionLabel = getOptionLabel(option);
                const tabIndex = isDisabled ? null : 0;
                const selected = isSelected(option);
                const key = optionLabel + '_' + index;

                return <SelectButtonItem key={key} label={optionLabel} className={option.className} option={option} onClick={onOptionClick} template={props.itemTemplate}
                    selected={selected} tabIndex={tabIndex} disabled={isDisabled} ariaLabelledBy={props.ariaLabelledBy} />
            });
        }

        return null;
    }

    const hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
    const otherProps = ObjectUtils.findDiffKeys(props, SelectButton.defaultProps);
    const className = classNames('p-selectbutton p-buttonset p-component', props.className);
    const items = createItems();

    return (
        <>
            <div ref={elementRef} id={props.id} className={className} style={props.style} {...otherProps} role="group">
                {items}
            </div>
            {hasTooltip && <Tooltip target={elementRef} content={props.tooltip} {...props.tooltipOptions} />}
        </>
    )
}));

SelectButton.displayName = 'SelectButton';
SelectButton.defaultProps = {
    __TYPE: 'SelectButton',
    id: null,
    value: null,
    options: null,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    tabIndex: null,
    multiple: false,
    unselectable: true,
    disabled: false,
    style: null,
    className: null,
    dataKey: null,
    tooltip: null,
    tooltipOptions: null,
    ariaLabelledBy: null,
    itemTemplate: null,
    onChange: null
}
