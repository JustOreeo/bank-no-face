import React from 'react'

const Button = ({
    handleSubmit,
    type='Button',
    action='submit',
    text,
}) => {
    return (
        <>
        {type === 'Button' ?
            <button
                type={action}
                className="green-button"
                onSubmit={ handleSubmit }
            >
                { text }
            </button>
            :
            <></>
        }
        </>
    )
}

export default Button