<div>
    <select>
        {#each countries as country}
            <option value={country.name}>
                {getFlagEmoji(country.name)} {country.name}
            </option>
        {/each}

    </select>
</div>

<script lang="ts">
    import { countries } from "./countries";

    function getFlagEmoji (name: string): string {
        const cc = name.replace(/^.*_(\S+)/, '$1');
        let codePoints = cc.toUpperCase().split('')
                .map((char, index) =>  127397 + char.charCodeAt(index));
	    return String.fromCodePoint(...codePoints);
    }
</script>