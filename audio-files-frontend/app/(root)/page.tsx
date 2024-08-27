import React from 'react'
import dotenv from 'dotenv';

import AudioTable from '@/components/AudioTable';
import UploadAudioDialog from '@/components/UploadAudioDialog';
import { getUserAudio } from '@/lib/actions';

dotenv.config();

const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:3000";

const Home = async () => {
  const userAudio: Audio[] = await getUserAudio() || [];

  return (
    <section>
      <h1>Audio Dashboard</h1>
      <div className="text-right">
        <UploadAudioDialog />
      </div>
      <AudioTable audio={userAudio} backendHost={BACKEND_HOST} />
    </section>
  )
}

export default Home