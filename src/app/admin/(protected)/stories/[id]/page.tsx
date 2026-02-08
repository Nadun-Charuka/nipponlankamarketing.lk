'use client';

import { use } from 'react';
import StoryForm from '../StoryForm';

export default function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return <StoryForm storyId={id} />;
}
