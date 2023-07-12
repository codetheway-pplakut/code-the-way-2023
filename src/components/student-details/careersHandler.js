import {
  addCareer,
  deleteCareer,
  editCareer,
  getCareerById,
  getStudentCareers,
} from '../../services/careers/careers';

export function getCareerByIdHandler(id) {
  const data = { id };
  return getCareerById(data);
}

export function getStudentCareersHandler(id) {
  return getStudentCareers(id);
}

export async function addCareerHandler(
  id,
  studentId,
  collegeBound,
  careerCluster,
  specificCareer,
  technicalCollegeBound
) {
  const data = {
    id,
    studentId,
    collegeBound,
    careerCluster,
    specificCareer,
    technicalCollegeBound,
  };
  await addCareer(data);
}

export async function editCareerHandler(
  id,
  studentId,
  collegeBound,
  careerCluster,
  specificCareer,
  technicalCollegeBound
) {
  const data = {
    id,
    studentId,
    collegeBound,
    careerCluster,
    specificCareer,
    technicalCollegeBound,
  };
  await editCareer(data);
}

export async function deleteCareerHandler(id) {
  await deleteCareer(id);
}
