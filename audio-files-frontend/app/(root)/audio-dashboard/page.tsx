import AudioTable from '@/components/AudioTable';
import { getUserAudio } from '@/lib/actions';
import React from 'react'

const AudioDashboard = async () => {
  const userAudio: Audio[] = await getUserAudio() || [];

  return (
    <section>
      <h1>User Admin</h1>
      <AudioTable audio={userAudio} />
    </section>
  )
}

export default AudioDashboard