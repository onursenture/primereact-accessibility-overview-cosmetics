import * as React from 'react';
import TreeNode from '../treenode';
import { CSSTransitionProps } from '../csstransition';

type TreeSelectSelectionModeType = 'single' | 'multiple' | 'checkbox';

type TreeSelectSelectionKeys = string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[] | undefined | null;

type TreeSelectDisplayType = 'comma' | 'chip';

type TreeSelectFilterModeType = 'lenient' | 'strict';

type TreeSelectValueTemplateType = React.ReactNode | ((selectedNodes: TreeNode | TreeNode[], props: TreeSelectProps) => React.ReactNode);

type TreeSelectPanelHeaderTemplateType = React.ReactNode | ((options: TreeSelectPanelHeaderTemplateOptions) => React.ReactNode);

type TreeSelectPanelFooterTemplateType = React.ReactNode | ((props: TreeSelectProps) => React.ReactNode);

type TreeSelectAppendToType = 'self' | HTMLElement | undefined | null;

interface TreeSelectPanelHeaderTemplateOptions {
    className: string;
    filterElement: JSX.Element;
    closeElement: JSX.Element;
    closeElementClassName: string;
    closeIconClassName: string;
    onCloseClick(): void;
    element: JSX.Element;
    props: TreeSelectProps;
}

interface TreeSelectChangeTargetOptions {
    name: string;
    id: string;
    value: TreeSelectSelectionKeys;
}

interface TreeSelectChangeParams {
    originalEvent: React.SyntheticEvent;
    value: TreeSelectSelectionKeys;
    stopPropagation(): void;
    preventDefault(): void;
    target: TreeSelectChangeTargetOptions;
}

type TreeSelectSelectionKeyType = boolean | TreeSelectCheckboxSelectionKeyType;

interface TreeSelectSelectionKeysType {
    [key: string]: TreeSelectSelectionKeyType;
}

interface TreeSelectCheckboxSelectionKeyType {
    checked?: boolean;
    partialChecked?: boolean;
}

interface TreeSelectEventNodeParams {
    originalEvent: React.SyntheticEvent;
    node: TreeNode;
}

interface TreeSelectFilterValueChangeParams {
    originalEvent: React.FormEvent<HTMLInputElement>;
    value: string;
}

export interface TreeSelectProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange'|'value' | 'ref'> {
    id?: string;
    value?: TreeSelectSelectionKeys;
    name?: string;
    style?: object;
    className?: string;
    disabled?: boolean;
    options?: TreeNode[];
    scrollHeight?: string;
    placeholder?: string;
    tabIndex?: number;
    inputId?: string;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    selectionMode?: TreeSelectSelectionModeType;
    panelStyle?: object;
    panelClassName?: string;
    appendTo?: TreeSelectAppendToType;
    emptyMessage?: string;
    display?: TreeSelectDisplayType;
    metaKeySelection?: boolean;
    valueTemplate?: TreeSelectValueTemplateType;
    panelHeaderTemplate?: TreeSelectPanelHeaderTemplateType;
    panelFooterTemplate?: TreeSelectPanelFooterTemplateType;
    transitionOptions?: CSSTransitionProps;
    dropdownIcon?: string;
    filter?: boolean;
    filterValue?: string;
    filterBy?: string;
    filterMode?: TreeSelectFilterModeType;
    filterPlaceholder?: string;
    filterLocale?: string;
    filterInputAutoFocus?: boolean;
    resetFilterOnHide?: boolean;
    onShow?(): void;
    onHide?(): void;
    onChange?(e: TreeSelectChangeParams): void;
    onNodeSelect?(node: TreeNode): void;
    onNodeUnselect?(node: TreeNode): void;
    onNodeExpand?(e: TreeSelectEventNodeParams): void;
    onNodeCollapse?(e: TreeSelectEventNodeParams): void;
    onFilterValueChange?(e: TreeSelectFilterValueChangeParams): void;
    children?: React.ReactNode;
}

export declare class TreeSelect extends React.Component<TreeSelectProps, any> { }
