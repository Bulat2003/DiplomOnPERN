import React, { useState } from 'react';

const ManageClients = () => {
    const [showClientListModal, setShowClientListModal] = useState(false);
    const [showClientDetailsModal, setShowClientDetailsModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const handleShowClientListModal = () => {
        setShowClientListModal(true);
    };

    const handleHideClientListModal = () => {
        setShowClientListModal(false);
    };

    const handleShowClientDetailsModal = (client) => {
        setSelectedClient(client);
        setShowClientDetailsModal(true);
    };

    const handleHideClientDetailsModal = () => {
        setShowClientDetailsModal(false);
    };

    return (
        <div>
        </div>
    );
};

export default ManageClients;
