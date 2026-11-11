<div class="plugin__mobile-header">
    { title }
</div>
<section class="plugin__content">
    <div
        class="plugin__title plugin__title--chevron-back"
        on:click={ () => bcast.emit('rqstOpen', 'menu') }
    >
    { title }
    </div>

    {#if !loggedIn}
        <p class="mb-15">
            Plugin storage belongs to the logged-in user. Log in to keep notes that follow you to every device.
        </p>
        <button class="button button--variant-orange" on:click={ () => login() }>
            Log in
        </button>
    {:else}
        <textarea class="mb-10" bind:value={ draft } placeholder="Write a note" />
        <button
            class="button button--variant-orange"
            class:button--loading={ busy }
            disabled={ !draft.trim() }
            on:click={ addNote }
        >
            Save note
        </button>

        {#if error}
            <p class="error mt-10">{ error }</p>
        {/if}

        <hr />

        {#each notes as note (note.key)}
            <div class="note mb-15">
                <textarea bind:value={ note.value } />
                <small>version { note.version }</small>
                <button class="button button--transparent size-s" on:click={ () => updateNote(note) }>
                    Update
                </button>
                <button class="button button--transparent size-s" on:click={ () => deleteNote(note) }>
                    Delete
                </button>
            </div>
        {:else}
            <p>No notes yet.</p>
        {/each}
    {/if}
</section>
<script lang="ts">
    import bcast from '@windy/broadcast';
    import { HttpError } from '@windy/errors';
    import { del, get, put } from '@windy/http';
    import { isLoggedInPromise, login } from '@windy/user';

    import { onMount } from 'svelte';

    import config from './pluginConfig';

    interface Note {
        key: string;
        value: string;
        version: string;
    }

    interface KeysResponse {
        items: { key: string; version: string }[];
    }

    interface ItemResponse {
        value: string;
        version: string;
    }

    interface VersionResponse {
        version: string;
    }

    // Namespace = <your Windy user id as the plugin author>:<plugin name>.
    // Every user gets their own copy of the namespace, so users never see each other's data.
    const AUTHOR_USER_ID = 0;
    const STORAGE_URL = `/plugins/v1/storage/${AUTHOR_USER_ID}:${config.name}`;
    const NOTE_PREFIX = 'note-';
    const HTTP_CONFLICT = 409;

    // withCredentials makes Windy send the user's login token; cache: false skips the client's HTTP cache
    const requestOptions = { withCredentials: true, cache: false };

    const { title } = config;

    let loggedIn = false;
    let notes: Note[] = [];
    let draft = '';
    let busy = false;
    let error = '';

    const loadNotes = async (): Promise<void> => {
        const { data } = await get<KeysResponse>(`${STORAGE_URL}/keys`, {
            ...requestOptions,
            qs: { prefix: NOTE_PREFIX },
        });
        notes = await Promise.all(
            data.items.map(async ({ key }) => {
                const { data: item } = await get<ItemResponse>(`${STORAGE_URL}/items/${key}`, requestOptions);
                return { key, value: item.value, version: item.version };
            }),
        );
    };

    const run = async (action: () => Promise<void>): Promise<void> => {
        busy = true;
        error = '';
        try {
            await action();
        } catch (err) {
            if (err instanceof HttpError && err.status === HTTP_CONFLICT) {
                error = 'This note was changed on another device. The latest version is loaded now.';
                await loadNotes();
            } else {
                error = `Storage request failed: ${err instanceof Error ? err.message : String(err)}`;
            }
        } finally {
            busy = false;
        }
    };

    // ifVersion "0" = create only, never overwrite an existing key
    const addNote = (): Promise<void> =>
        run(async () => {
            await put<VersionResponse>(`${STORAGE_URL}/items/${NOTE_PREFIX}${Date.now()}`, {
                ...requestOptions,
                data: { value: draft, ifVersion: '0' },
            });
            draft = '';
            await loadNotes();
        });

    // Sending the version we loaded turns a concurrent edit elsewhere into a 409 instead of a silent overwrite
    const updateNote = (note: Note): Promise<void> =>
        run(async () => {
            const { data } = await put<VersionResponse>(`${STORAGE_URL}/items/${note.key}`, {
                ...requestOptions,
                data: { value: note.value, ifVersion: note.version },
            });
            note.version = data.version;
            notes = notes;
        });

    const deleteNote = (note: Note): Promise<void> =>
        run(async () => {
            await del(`${STORAGE_URL}/items/${note.key}`, {
                ...requestOptions,
                qs: { ifVersion: note.version },
            });
            await loadNotes();
        });

    onMount(async () => {
        loggedIn = await isLoggedInPromise();
        if (loggedIn) {
            await run(loadNotes);
        }
    });
</script>

<style lang="less">
    textarea {
        display: block;
        width: 100%;
        min-height: 60px;
    }
    .note small {
        display: block;
        opacity: 0.6;
    }
    .error {
        color: #f66;
    }
</style>
