import API from "../api/axios";  // Use the centralized axios instance

export interface Group {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  creator_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface Member {
  id: number;
  username: string;
  email: string;
  avatar_url?: string;
}

export interface Recipe {
  id: number;
  title: string;
  image_url: string;
  description: string;
  user_id: number;
}

const GROUPS_ENDPOINT = "/groups";

// Get all groups
export const getAllGroups = async (): Promise<Group[]> => {
  const response = await API.get(GROUPS_ENDPOINT);
  return response.data;
};

// Get group by ID
export const getGroupById = async (id: number): Promise<Group> => {
  const response = await API.get(`${GROUPS_ENDPOINT}/${id}`);
  return response.data;
};

// Create a new group
export const createGroup = async (groupData: Partial<Group>): Promise<Group> => {
  const response = await API.post(GROUPS_ENDPOINT, groupData);
  return response.data;
};

// Update a group
export const updateGroup = async (id: number, groupData: Partial<Group>): Promise<Group> => {
  const response = await API.put(`${GROUPS_ENDPOINT}/${id}`, groupData);
  return response.data;
};

// Delete a group
export const deleteGroup = async (id: number): Promise<{ message: string }> => {
  const response = await API.delete(`${GROUPS_ENDPOINT}/${id}`);
  return response.data;
};

// Join a group
export const joinGroup = async (groupId: number): Promise<{ message: string }> => {
  const response = await API.post(`${GROUPS_ENDPOINT}/${groupId}/join`);
  return response.data;
};

// Leave a group
export const leaveGroup = async (groupId: number): Promise<{ message: string }> => {
  const response = await API.post(`${GROUPS_ENDPOINT}/${groupId}/leave`);
  return response.data;
};

// Get group members
export const getGroupMembers = async (groupId: number): Promise<Member[]> => {
  const response = await API.get(`${GROUPS_ENDPOINT}/${groupId}/members`);
  return response.data;
};

// Get group recipes
export const getGroupRecipes = async (groupId: number): Promise<Recipe[]> => {
  const response = await API.get(`${GROUPS_ENDPOINT}/${groupId}/recipes`);
  return response.data;
};