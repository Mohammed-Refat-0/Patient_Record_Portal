import { toast } from 'react-toastify';

export const handleSearch = (e, username, setSearch, refetch) => {
    e.preventDefault();
    if (username.trim() === '') {
        toast.error('Please enter a username');
        return;
    }
    setSearch(true);
    refetch();
};

export const handleAddBloodType = async (username, bloodType, addBloodType, setShowBloodTypeModal, refetch) => {
    try {
        await addBloodType({ username, bloodType }).unwrap();
        toast.success('Blood type updated successfully');
        setShowBloodTypeModal(false);
        refetch();
    } catch (error) {
        const errorMessage = error.data?.message || 'Failed to update blood type';
        toast.error(errorMessage);
    }
};

export const handleAddHeight = async (username, height, addHeight, setShowHeightModal, refetch) => {
    try {
        await addHeight({ username, height }).unwrap();
        toast.success('Height added successfully');
        setShowHeightModal(false);
        refetch();
    } catch (error) {
        const errorMessage = error.data?.message || 'Failed to add height';
        toast.error(errorMessage);
    }
};

export const handleAddWeight = async (username, weight, addWeight, setShowWeightModal, refetch) => {
    try {
        await addWeight({ username, weight }).unwrap();
        toast.success('Weight added successfully');
        setShowWeightModal(false);
        refetch();
    } catch (error) {
        const errorMessage = error.data?.message || 'Failed to add weight';
        toast.error(errorMessage);
    }
};

export const handleAddChronicIllness = async (username, chronicIllness, addChronicIllness, setShowChronicIllnessModal, refetch) => {
    try {
        await addChronicIllness({ username, illness: chronicIllness }).unwrap();
        toast.success('Chronic illness added successfully');
        setShowChronicIllnessModal(false);
        refetch();
    } catch (error) {
        const errorMessage = error.data?.message || 'Failed to add chronic illness';
        toast.error(errorMessage);
    }
};

export const handleAddDisability = async (username, disability, addDisability, setShowDisabilityModal, refetch) => {
    try {
        await addDisability({ username, disability }).unwrap();
        toast.success('Disability added successfully');
        setShowDisabilityModal(false);
        refetch();
    } catch (error) {
        const errorMessage = error.data?.message || 'Failed to add disability';
        toast.error(errorMessage);
    }
};

export const handleAddAllergy = async (username, allergy, addAllergy, setShowAllergyModal, refetch) => {
    try {
        await addAllergy({ username, allergy }).unwrap();
        toast.success('Allergy added successfully');
        setShowAllergyModal(false);
        refetch();
    } catch (error) {
        const errorMessage = error.data?.message || 'Failed to add allergy';
        toast.error(errorMessage);
    }
};

export const handleAddMedication = async (username, medication, dosage, startDate, endDate, addMedication, setShowMedicationModal, refetch) => {
    try {
        await addMedication({ username, medication, dosage, startDate, endDate }).unwrap();
        toast.success('Medication added successfully');
        setShowMedicationModal(false);
        refetch();
    } catch (error) {
        const errorMessage = error.data?.message || 'Failed to add medication';
        toast.error(errorMessage);
    }
};

export const handleAddPastSurgery = async (username, pastSurgery, date, addPastSurgery, setShowPastSurgeryModal, refetch) => {
    try {
        await addPastSurgery({ username, surgery: pastSurgery, date }).unwrap();
        toast.success('Past surgery added successfully');
        setShowPastSurgeryModal(false);
        refetch();
    } catch (error) {
        const errorMessage = error.data?.message || 'Failed to add past surgery';
        toast.error(errorMessage);
    }
};

export const handleAddDiagnosis = async (username, diagnosis, date, addDiagnosis, setShowDiagnosisModal, refetch) => {
    try {
        await addDiagnosis({ username, diagnosis, date }).unwrap();
        toast.success('Diagnosis added successfully');
        setShowDiagnosisModal(false);
        refetch();
    } catch (error) {
        const errorMessage = error.data?.message || 'Failed to add diagnosis';
        toast.error(errorMessage);
    }
};

export const handleAddScan = async (username, testname, file, addScan, setShowScanModal, refetch) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('testname', testname);
    formData.append('file', file);

    try {
        await addScan(formData).unwrap();
        toast.success('Scan added successfully');
        setShowScanModal(false);
        refetch();
    } catch (error) {
        const errorMessage = error.data?.message || 'Failed to add scan';
        toast.error(errorMessage);
    }
};

export const handleAddLab = async (username, testname, file, addLab, setShowLabModal, refetch) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('testname', testname);
    formData.append('file', file);

    try {
        await addLab(formData).unwrap();
        toast.success('Lab added successfully');
        setShowLabModal(false);
        refetch();
    } catch (error) {
        const errorMessage = error.data?.message || 'Failed to add lab';
        toast.error(errorMessage);
    }
};
