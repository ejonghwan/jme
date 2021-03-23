import React from 'react';

const NicknameEditForm = () => {
    return (
        <form>
            <label htmlFor="nicknameEdit">nickname</label>
            <input name="nicknameEdit" />
            <button>edit</button>
        </form>
    );
};

export default NicknameEditForm;