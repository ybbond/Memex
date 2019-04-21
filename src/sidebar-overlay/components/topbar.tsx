import * as React from 'react'
import cx from 'classnames'
import { Tooltip, ButtonTooltip } from 'src/common-ui/components/'
import CloseButton from './close-button'
import SearchBox from './search-box'

const styles = require('./topbar.css')

interface Props {
    env: 'inpage' | 'overview'
    searchValue: string
    showClearFiltersBtn: boolean
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    handleClearBtn: (e: React.MouseEvent<HTMLButtonElement>) => void
    handleFilterBtnClick: () => void
    disableAddCommentBtn: boolean
    handleCloseBtnClick: () => void
    handleSettingsBtnClick: () => void
    handleAddCommentBtnClick: () => void
    handleClearFiltersBtnClick: React.MouseEventHandler<HTMLSpanElement>
}

/* tslint:disable-next-line variable-name */
const Topbar = ({
    disableAddCommentBtn,
    handleCloseBtnClick,
    handleSettingsBtnClick,
    handleAddCommentBtnClick,
    ...props
}: Props) => (
    <div className={styles.topbar}>
        {props.env === 'overview' && (
            <ButtonTooltip tooltipText="Close (ESC)" position="rightCentered">
                <CloseButton
                    title="Close sidebar once. Disable via Memex icon in the extension toolbar."
                    clickHandler={e => {
                        e.stopPropagation()
                        handleCloseBtnClick()
                    }}
                />
            </ButtonTooltip>
        )}
        {props.env === 'inpage' && (
            <React.Fragment>
                <SearchBox
                    placeholder={'Search Memex'}
                    searchValue={props.searchValue}
                    onSearchChange={props.handleChange}
                    onSearchEnter={props.handleSearchKeyDown}
                    onClearBtn={props.handleClearBtn}
                />
                <button
                    onClick={props.handleFilterBtnClick}
                    className={styles.filterButton}
                >
                    Filters
                    {props.showClearFiltersBtn && (
                        <ButtonTooltip
                            position="bottom"
                            tooltipText={'Clear filters'}
                        >
                            <span
                                className={styles.clearFilters}
                                onClick={props.handleClearFiltersBtnClick}
                            />
                        </ButtonTooltip>
                    )}
                </button>
            </React.Fragment>
        )}

        <div className={styles.right}>
            {/* Button to add a comment. */}
            <ButtonTooltip
                tooltipText="Add notes to page"
                position="leftNarrow"
            >
                <button
                    className={cx(styles.button, styles.comments, {
                        [styles.disabled]: disableAddCommentBtn,
                    })}
                    onClick={e => {
                        e.stopPropagation()
                        handleAddCommentBtnClick()
                    }}
                />
            </ButtonTooltip>
        </div>
    </div>
)

export default Topbar
