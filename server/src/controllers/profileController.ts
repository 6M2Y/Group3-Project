import { Request, Response } from 'express';
import { getProfileData } from '../Services/profileService';

interface AuthenticatedRequest extends Request {
  user?: { id: string }; // Adjust the type based on your user object
}

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const profileData = await getProfileData(req.user.id);
    if (!profileData) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }
    res.json(profileData);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
