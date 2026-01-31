<div class="plugin__mobile-header">
    {title}
</div>
<section class="plugin__content">
    <div
        class="plugin__title plugin__title--chevron-back"
        on:click={() => bcast.emit('rqstOpen', 'menu')}
    >
        {title}
    </div>

    <div class="astro-plugin">
        <!-- Help Button -->
        <div class="help-section">
            <button class="help-btn" on:click={() => (showHelp = !showHelp)} title={t('help')}>
                ℹ️ {t('help')}
            </button>
        </div>

        <!-- Help Modal -->
        {#if showHelp}
            <div class="help-overlay" on:click={() => (showHelp = false)}>
                <div class="help-modal" on:click|stopPropagation>
                    <div class="help-header">
                        <h3>{t('helpTitle')}</h3>
                        <button class="help-close" on:click={() => (showHelp = false)}>×</button>
                    </div>
                    <div class="help-content">
                        <div class="help-item">
                            <strong>📊 Score:</strong>
                            {t('helpScore')}
                        </div>
                        <div class="help-item">
                            <strong>🧮 {t('glossaryCalculation')}:</strong>
                            <div
                                style="margin-top:2px; font-size:0.9em; opacity:0.85; line-height:1.3"
                            >
                                {t('glossaryCalcDetails')}
                            </div>
                        </div>
                        <div class="help-item">
                            <strong>🌌 DSO:</strong>
                            {t('helpDSO')}
                        </div>
                        <div class="help-item">
                            <strong>🪐 Planetary:</strong>
                            {t('helpPlanetary')}
                        </div>
                        <div class="help-item">
                            <strong>👁️ Seeing:</strong>
                            {t('helpSeeing')}
                        </div>
                        <div class="help-item">
                            <strong>🌫️ Transparency:</strong>
                            {t('helpTransparency')}
                        </div>
                        <div class="help-item">
                            <strong>🌙 Moon:</strong>
                            {t('helpMoon')}
                        </div>
                        <div class="help-item">
                            <strong>📷 Equipment:</strong>
                            {t('helpEquipment')}
                            <div
                                style="margin-top:5px; font-size:0.85em; opacity:0.8; border-left:2px solid #ed5; padding-left:5px;"
                            >
                                <em>Example (EdgeHD 8 + ASI2600):</em><br />
                                <span style="font-size:0.9em; opacity:0.9; color:#eee;"
                                    >(Set Pixel: 3.76µm, Aperture: 203mm)</span
                                ><br />
                                • Native (2032mm): <strong>0.38"/px</strong> (Needs perfect seeing)<br
                                />
                                • Reducer 0.7x (1422mm): <strong>0.55"/px</strong> (Needs good
                                seeing)<br />
                                • Hyperstar (400mm): <strong>1.94"/px</strong> (Forgiving)
                            </div>
                        </div>
                        <div class="help-item">
                            <strong>⏰ Windows:</strong>
                            {t('helpWindows')}
                        </div>

                        <div
                            class="help-item help-about"
                            style="margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 10px;"
                        >
                            <strong style="font-size: 1.1em; color: #ffd700;"
                                >{t('aboutTitle')}</strong
                            >
                            <div style="font-size: 0.9em; opacity: 0.8; margin-bottom: 5px;">
                                {t('aboutDesc')}
                            </div>
                            <div style="font-size: 0.9em;">
                                {t('author')}: <strong>Edgar Lopez</strong>
                            </div>
                            <div style="margin-top: 5px;">
                                <a
                                    href="https://github.com/coderGo93/windy-plugin-astronomy-seeing"
                                    target="_blank"
                                    style="color: #4da6ff; text-decoration: none;"
                                >
                                    🔗 {t('visitRepo')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}

        <!-- Mode Selection -->
        <div class="mode-selector">
            <button
                class="mode-btn {imagingMode === 'dso' ? 'active' : ''}"
                on:click={() => {
                    imagingMode = 'dso';
                }}
            >
                DSO
            </button>
            <button
                class="mode-btn {imagingMode === 'planetary' ? 'active' : ''}"
                on:click={() => {
                    imagingMode = 'planetary';
                }}
            >
                Planetary
            </button>
        </div>

        <!-- DSO Sub-category (only show when DSO mode is selected) -->
        {#if imagingMode === 'dso'}
            <div class="dso-subcategory">
                <label for="dsoType">DSO Type:</label>
                <select id="dsoType" bind:value={dsoType}>
                    <option value="galaxy">Galaxies</option>
                    <option value="nebula">Nebulae (with filters)</option>
                    <option value="cluster">Star Clusters</option>
                </select>
            </div>
        {/if}

        <!-- Equipment Section -->
        <div class="focal-length-section" style="margin-bottom: 5px;">
            <!-- Focal Length -->
            <div class="slider-row">
                <label for="focalLength">Focal Length: <strong>{focalLength}mm</strong></label>
                <input
                    type="range"
                    id="focalLength"
                    min="50"
                    max="3000"
                    step="50"
                    bind:value={focalLength}
                />
            </div>
            <!-- Pixel Size -->
            <div class="slider-row" style="margin-top:5px;">
                <label for="pixelSize">Pixel Size: <strong>{pixelSize}µm</strong></label>
                <input
                    type="range"
                    id="pixelSize"
                    min="1.0"
                    max="9.0"
                    step="0.01"
                    bind:value={pixelSize}
                />
            </div>
            <!-- Aperture -->
            <div class="slider-row" style="margin-top:5px;">
                <label for="aperture">Aperture: <strong>{aperture}mm</strong></label>
                <input
                    type="range"
                    id="aperture"
                    min="50"
                    max="400"
                    step="10"
                    bind:value={aperture}
                />
            </div>

            <!-- Calculated Resolution -->
            <div
                style="font-size: 0.85em; opacity: 0.9; margin-top: 5px; text-align: right; color: #ffd700;"
            >
                Resolution: <strong>{((206.265 * pixelSize) / focalLength).toFixed(2)}"/px</strong>
            </div>
        </div>

        <!-- Main Score Gauge -->
        <div class="score-gauge">
            <div class="gauge-circle">
                <div class="gauge-fill" style="--percentage: {overallScore}"></div>
                <div class="gauge-content">
                    <div class="score-number">{Math.round(overallScore)}%</div>
                    <div class="astro-status {getStatusClass(overallScore)}">
                        {getStatusText(overallScore)}
                    </div>
                    {#if scoreReasons.length > 0}
                        <div class="score-reasons">
                            {#each scoreReasons.slice(0, 2) as reason}
                                <div class="reason-item">{reason}</div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Metrics Grid -->
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-label">Seeing</div>
                <div class="metric-value {getSeeingClass(seeingScore)}">
                    {Math.round(seeingScore)}%
                </div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Transparency</div>
                <div class="metric-value {getTransparencyClass(transparencyScore)}">
                    {Math.round(transparencyScore)}%
                </div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Dark Sky</div>
                <div class="metric-value {getDarkSkyClass(isDarkSky)}">
                    {isDarkSky ? t('yes') : t('no')}
                </div>
            </div>
            <div class="metric-card {dewRisk === 'critical' ? 'dew-warning' : ''}">
                <div class="metric-label">Dew Risk</div>
                <div class="metric-value">{dewRisk === 'critical' ? t('critical') : t('low')}</div>
            </div>
        </div>

        <!-- Advanced Diagnostics Toggle -->
        <div class="diagnostics-toggle">
            <button class="toggle-btn" on:click={() => (showDiagnostics = !showDiagnostics)}>
                {showDiagnostics ? '▼' : '▶'} Advanced Diagnostics
            </button>
        </div>

        <!-- Advanced Diagnostics Panel -->
        {#if showDiagnostics}
            <div class="diagnostics-panel">
                <!-- Location & Time -->
                <!-- Location & Time -->
                <div class="diag-section">
                    <div
                        class="diag-header"
                        on:click={() => (showLocationHelp = !showLocationHelp)}
                    >
                        <span>📍 Location & Time</span>
                        <span>{showLocationHelp ? '▼' : '▶'}</span>
                    </div>

                    {#if showLocationHelp}
                        <div class="help-glossary">
                            <div class="help-item">
                                <strong>Coordinates:</strong> Precise location for forecast.
                            </div>
                            <div class="help-item">
                                <strong>Time:</strong> Local and UTC time reference.
                            </div>
                        </div>
                    {/if}
                    <div class="diagnostic-row">
                        <span>Coordinates:</span>
                        <span>{currentLat.toFixed(3)}°, {currentLon.toFixed(3)}°</span>
                    </div>
                    <div class="diagnostic-row">
                        <span>Local Time:</span>
                        <span
                            >{currentTime.toLocaleString('es-ES', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>UTC Time:</span>
                        <span>{currentTime.toISOString().substring(11, 19)} UTC</span>
                    </div>
                </div>

                <!-- Astronomical Conditions -->
                <div class="diag-section">
                    <div class="diag-header" on:click={() => (showAstroHelp = !showAstroHelp)}>
                        <span>🌙 Astronomical Conditions</span>
                        <span>{showAstroHelp ? '▼' : '▶'}</span>
                    </div>

                    {#if showAstroHelp}
                        <div class="help-glossary">
                            <div class="help-item">
                                <strong>Astro Twilight:</strong> Sun &lt; -18°. Pitch black sky needed
                                for DSO.
                            </div>
                            <div class="help-item">
                                <strong>Moon Phase:</strong> New Moon is best (0% illumination). Full
                                Moon washes out DSOs.
                            </div>
                        </div>
                    {/if}
                    <div class="diagnostic-row">
                        <span>Sun Altitude:</span>
                        <span
                            class={sunAltitude < -18
                                ? 'good-value'
                                : sunAltitude < -12
                                  ? 'fair-value'
                                  : 'poor-value'}>{sunAltitude.toFixed(1)}°</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>Twilight Phase:</span>
                        <span class={getTwilightClass(sunAltitude)}
                            >{getTwilightPhase(sunAltitude)}</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>Moon Altitude:</span>
                        <span
                            >{moonAltitude.toFixed(1)}° {moonAltitude < 0
                                ? t('belowHorizon')
                                : t('aboveHorizon')}</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>Moon Illumination:</span>
                        <span>{(moonIllumination * 100).toFixed(1)}%</span>
                    </div>
                    <div class="diagnostic-row">
                        <span>Moon Phase:</span>
                        <span>{getMoonPhase(moonIllumination)}</span>
                    </div>
                </div>

                <!-- Atmospheric Conditions -->
                <div class="diag-section">
                    <div
                        class="diag-header"
                        on:click={() => (showConditionsHelp = !showConditionsHelp)}
                    >
                        <span>🌤️ Atmospheric Conditions</span>
                        <span>{showConditionsHelp ? '▼' : '▶'}</span>
                    </div>

                    {#if showConditionsHelp}
                        <div class="help-glossary">
                            <div class="help-item">{t('glossaryJetStream')}</div>
                            <div class="help-item">{t('glossarySeeingFWHM')}</div>
                            <div class="help-item">{t('glossaryCloudLayers')}</div>
                        </div>
                    {/if}
                    <div class="diagnostic-row">
                        <span>Jet Stream (250hPa):</span>
                        <span
                            class={windSpeed250 < 30
                                ? 'good-value'
                                : windSpeed250 < 60
                                  ? 'fair-value'
                                  : 'poor-value'}>{formatWindSpeed(windSpeed250)}</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>Seeing Estimate:</span>
                        <span class={getSeeingClass(seeingScore)}
                            >{getSeeingEstimate(windSpeed250)}"</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>High Clouds:</span>
                        <span
                            class={highClouds < 20
                                ? 'good-value'
                                : highClouds < 50
                                  ? 'fair-value'
                                  : 'poor-value'}>{highClouds.toFixed(0)}%</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>Mid Clouds:</span>
                        <span
                            class={midClouds < 30
                                ? 'good-value'
                                : midClouds < 60
                                  ? 'fair-value'
                                  : 'poor-value'}>{midClouds.toFixed(0)}%</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>Low Clouds:</span>
                        <span
                            class={lowClouds < 40
                                ? 'good-value'
                                : lowClouds < 70
                                  ? 'fair-value'
                                  : 'poor-value'}>{lowClouds.toFixed(0)}%</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>Total Cloud Cover:</span>
                        <span
                            class={totalCloudCover < 20
                                ? 'good-value'
                                : totalCloudCover < 50
                                  ? 'fair-value'
                                  : 'poor-value'}>{totalCloudCover.toFixed(0)}%</span
                        >
                    </div>
                </div>

                <!-- Environmental Conditions -->
                <div class="diag-section">
                    <div
                        class="diag-header"
                        on:click={() => (showEnvironmentHelp = !showEnvironmentHelp)}
                    >
                        <span>🌡️ Environmental Conditions</span>
                        <span>{showEnvironmentHelp ? '▼' : '▶'}</span>
                    </div>

                    {#if showEnvironmentHelp}
                        <div class="help-glossary">
                            <div class="help-item">{t('glossaryDewPointGap')}</div>
                            <div class="help-item">{t('glossarySurfaceWind')}</div>
                        </div>
                    {/if}
                    <div class="diagnostic-row">
                        <span>Temperature:</span>
                        <span>{formatTemperature(temperature, true)}</span>
                    </div>
                    <div class="diagnostic-row">
                        <span>Dew Point:</span>
                        <span>{formatTemperature(dewPoint, true)}</span>
                    </div>
                    <div class="diagnostic-row">
                        <span>{t('humidity')}:</span>
                        <span class={humidity < 85 ? 'good-value' : 'poor-value'}
                            >{humidity.toFixed(0)}%</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>{t('windGusts')}:</span>
                        <span
                            class={windGusts < 30
                                ? 'good-value'
                                : windGusts < 50
                                  ? 'fair-value'
                                  : 'poor-value'}>{formatWindSpeed(windGusts)}</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>Dew Point Gap:</span>
                        <span
                            class={temperature - dewPoint > 5
                                ? 'good-value'
                                : temperature - dewPoint > 2
                                  ? 'fair-value'
                                  : 'poor-value'}>{formatTemperature(temperature - dewPoint)}</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>Dew Formation Time:</span>
                        <span>{getDewFormationTime(temperature, dewPoint)}</span>
                    </div>
                </div>

                <!-- Air Quality (CAMS) -->
                {#if hasAirQuality}
                    <div class="diag-section">
                        <div
                            class="diag-header"
                            on:click={() => (showAirQualityHelp = !showAirQualityHelp)}
                        >
                            <span>{showAirQualityHelp ? '▼' : '▶'} Air Quality (CAMS)</span>
                        </div>
                        {#if showAirQualityHelp}
                            <div class="help-glossary">
                                {#if aod >= 0}
                                    <div class="help-item">
                                        <strong>AOD (550nm):</strong> Aerosol Optical Depth. Measures
                                        extinction of light by dust/haze. &lt; 0.1 is Excellent.
                                    </div>
                                {/if}
                                <div class="help-item">
                                    <strong>PM2.5:</strong> Fine particles. Affects transparency near
                                    horizon.
                                </div>
                                {#if dust >= 0}
                                    <div class="help-item">
                                        <strong>Dust Mass:</strong>
                                        {t('glossaryDust')}
                                    </div>
                                {/if}
                            </div>
                        {/if}
                        {#if aod >= 0}
                            <div class="diagnostic-row">
                                <span>AOD (550nm):</span>
                                <span
                                    class={aod < 0.1
                                        ? 'good-value'
                                        : aod < 0.3
                                          ? 'fair-value'
                                          : 'poor-value'}
                                >
                                    {aod.toFixed(2)}
                                </span>
                            </div>
                        {/if}
                        <div class="diagnostic-row">
                            <span>PM2.5:</span>
                            <span
                                class={pm25 < 5
                                    ? 'good-value'
                                    : pm25 < 15
                                      ? 'fair-value'
                                      : 'poor-value'}
                            >
                                {pm25.toFixed(1)} µg/m³
                            </span>
                        </div>
                        {#if dust >= 0}
                            <div class="diagnostic-row">
                                <span>Dust Mass:</span>
                                <span
                                    class={dust < 10
                                        ? 'good-value'
                                        : dust < 40
                                          ? 'fair-value'
                                          : 'poor-value'}
                                >
                                    {dust.toFixed(1)} µg/m³
                                </span>
                            </div>
                        {/if}
                    </div>
                {/if}

                <!-- Advanced Atmospheric (for scientific accuracy) -->
                <div class="diag-section">
                    <div
                        class="diag-header"
                        on:click={() => (showAtmosphericHelp = !showAtmosphericHelp)}
                    >
                        <span>🔬 Advanced Atmospheric</span>
                        <span>{showAtmosphericHelp ? '▼' : '▶'}</span>
                    </div>

                    {#if showAtmosphericHelp}
                        <div class="help-glossary">
                            <div class="help-item">{t('glossaryThermalGradient')}</div>
                            <div class="help-item">{t('glossaryPrecipWater')}</div>
                            <div class="help-item">{t('glossaryStabilityIndex')}</div>
                            <div
                                class="help-item"
                                style="font-style: italic; margin-top: 8px; opacity: 0.7;"
                            >
                                {t('glossaryModelDisclaimer')}
                            </div>
                        </div>
                    {/if}

                    <div class="diagnostic-row">
                        <span>Thermal Gradient:</span>
                        <span
                            class={thermalGradient < 6.0
                                ? 'good-value'
                                : thermalGradient < 7.0
                                  ? 'fair-value'
                                  : 'poor-value'}
                            >{thermalGradient.toFixed(2)} °C/km
                            <small
                                >({thermalGradient < 6.0
                                    ? 'Stable'
                                    : thermalGradient < 7.5
                                      ? 'Moderate'
                                      : 'Unstable'})</small
                            >
                        </span>
                    </div>
                    <div class="diagnostic-row">
                        <span>Precipitable Water:</span>
                        <span
                            class={precipitableWater < 10
                                ? 'good-value'
                                : precipitableWater < 20
                                  ? 'fair-value'
                                  : 'poor-value'}
                            >{precipitableWater.toFixed(1)} mm
                            <small
                                >({precipitableWater < 10
                                    ? 'Excellent'
                                    : precipitableWater < 20
                                      ? 'Good'
                                      : 'Poor'} transparency)</small
                            >
                        </span>
                    </div>
                    <div class="diagnostic-row">
                        <span>Stability Index:</span>
                        <span
                            class={stabilityIndex < 20
                                ? 'good-value'
                                : stabilityIndex < 30
                                  ? 'fair-value'
                                  : 'poor-value'}
                            >{stabilityIndex.toFixed(1)}
                            <small
                                >({stabilityIndex < 20
                                    ? 'Stable'
                                    : stabilityIndex < 30
                                      ? 'Moderate'
                                      : 'Unstable'})</small
                            >
                        </span>
                    </div>
                </div>

                <!-- Equipment Recommendations -->
                <div class="diag-section">
                    <div
                        class="diag-header"
                        on:click={() => (showEquipmentHelp = !showEquipmentHelp)}
                    >
                        <span>🔭 Equipment Recommendations</span>
                        <span>{showEquipmentHelp ? '▼' : '▶'}</span>
                    </div>

                    {#if showEquipmentHelp}
                        <div class="help-glossary">
                            <div class="help-item">{t('glossaryHeater')}</div>
                            <div class="help-item">{t('glossaryMaxMag')}</div>
                            <div class="help-item">{t('glossaryExposure')}</div>
                            <div class="help-item">{t('glossaryOptFL')}</div>
                        </div>
                    {/if}
                    <div class="diagnostic-row">
                        <span>Dew Heater:</span>
                        <span class={dewRisk === 'critical' ? 'poor-value' : 'good-value'}
                            >{dewRisk === 'critical' ? t('required') : t('recommended')}</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>Autoguiding:</span>
                        <span class={windSpeed250 > 40 ? 'poor-value' : 'good-value'}
                            >{windSpeed250 > 40 ? t('essential') : t('standardOk')}</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>Exposure Time:</span>
                        <span>{getRecommendedExposure(windSpeed250, focalLength)}</span>
                    </div>
                    <div class="diagnostic-row">
                        <span>Optimal FL Range:</span>
                        <span>{getOptimalFocalLength(windSpeed250)}</span>
                    </div>
                </div>

                <!-- Current Scores Breakdown -->
                <div class="diag-section">
                    <div class="diag-header" on:click={() => (showScoreHelp = !showScoreHelp)}>
                        <span>📊 Score Breakdown</span>
                        <span>{showScoreHelp ? '▼' : '▶'}</span>
                    </div>

                    {#if showScoreHelp}
                        <div class="help-glossary">
                            <div class="help-item">{t('glossaryDSOWeight')}</div>
                            <div class="help-item">{t('glossaryPlanetaryWeight')}</div>
                        </div>
                    {/if}
                    <div class="diagnostic-row">
                        <span>Seeing Score:</span>
                        <span class={getSeeingClass(seeingScore)}>{Math.round(seeingScore)}%</span>
                    </div>
                    <div class="diagnostic-row">
                        <span>Transparency Score:</span>
                        <span class={getTransparencyClass(transparencyScore)}
                            >{Math.round(transparencyScore)}%</span
                        >
                    </div>
                    <div class="diagnostic-row">
                        <span>Moon Impact:</span>
                        <span>{getMoonImpact()}%</span>
                    </div>
                    <div class="diagnostic-row">
                        <span>Overall Score:</span>
                        <span class={getStatusClass(overallScore)}>{Math.round(overallScore)}%</span
                        >
                    </div>
                </div>
            </div>
        {/if}

        <!-- Hourly Forecast Toggle -->
        <div class="hourly-toggle">
            <button class="toggle-btn" on:click={() => (showHourly = !showHourly)}>
                {showHourly ? '▼' : '▶'} Next 24 Hours - from {currentTime.toLocaleDateString(
                    'es-ES',
                    {
                        weekday: 'short',
                        day: '2-digit',
                        month: '2-digit',
                    },
                )}
                {currentTime.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </button>
        </div>

        <!-- Hourly Forecast Panel -->
        {#if showHourly}
            <div class="hourly-panel">
                <div class="hourly-header">
                    <span>Time (Local)</span>
                    <span>Score</span>
                    <span>Status</span>
                    <span>Sun/Moon</span>
                </div>
                {#each hourlyData as hour, index}
                    <div class="hourly-row {hour.isGoodViewing ? 'good-hour' : 'poor-hour'}">
                        <span class="hourly-time">{hour.hour}</span>
                        <span
                            class="hourly-score {hour.score >= 60
                                ? 'good-value'
                                : hour.score >= 40
                                  ? 'fair-value'
                                  : 'poor-value'}">{hour.score}%</span
                        >
                        <span class="hourly-status">{hour.status}</span>
                        <span class="hourly-conditions">
                            <small>
                                S: {hour.sunAlt.toFixed(0)}°<br />
                                M: {hour.moonAlt.toFixed(0)}°
                            </small>
                        </span>
                    </div>
                {/each}
            </div>
        {/if}

        <!-- Multi-day Forecast Toggle -->
        <div class="forecast-toggle">
            <button class="toggle-btn" on:click={() => (showForecast = !showForecast)}>
                {showForecast ? '▼' : '▶'} 7-Day Forecast
            </button>
        </div>

        <!-- Multi-day Forecast Panel -->
        {#if showForecast}
            <div class="forecast-panel">
                <div class="forecast-header">
                    <span>Date</span>
                    <span>Score</span>
                    <span>Moon</span>
                    <span>Viewing Window</span>
                </div>
                {#each forecastData as day, index}
                    <div
                        class="forecast-day {day.score >= 60
                            ? 'good-day'
                            : day.score >= 40
                              ? 'fair-day'
                              : 'poor-day'}"
                    >
                        <span class="forecast-date">{day.date}</span>
                        <span class="forecast-score">{day.score}%</span>
                        <span class="forecast-moon">{(day.moonIllum * 100).toFixed(0)}%</span>
                        <span class="forecast-window">
                            {#if day.viewingWindow}
                                {day.viewingWindow.start}-{day.viewingWindow.end}<br />
                                <small class="window-info"
                                    >({day.viewingWindow.duration}, best: {day.viewingWindow
                                        .bestHour})</small
                                >
                            {:else}
                                <span class="no-window">No good window</span>
                            {/if}
                        </span>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</section>

<script lang="ts">
    import bcast from '@windy/broadcast';
    import { onDestroy, onMount } from 'svelte';
    import * as SunCalc from 'suncalc';
    import { map } from '@windy/map';
    import store from '@windy/store';
    import picker from '@windy/picker';

    import { getMeteogramForecastData, getPointForecastData } from '@windy/fetch';
    import metrics from '@windy/metrics';
    import config from './pluginConfig';

    const { title } = config;

    // State variables
    let imagingMode: 'dso' | 'planetary' = 'dso';
    let dsoType: 'nebula' | 'galaxy' | 'cluster' = 'nebula';
    let focalLength = 2032; // Default: EdgeHD 8
    let pixelSize = 3.76; // Default: ASI2600
    let aperture = 203; // Default: 8"
    let showDiagnostics = false;
    let showAtmosphericHelp = false; // Advanced Atmospheric
    let showConditionsHelp = false; // Atmospheric Conditions
    let showLocationHelp = false; // Location & Time
    let showAstroHelp = false; // Astronomical Conditions (New)
    let showEnvironmentHelp = false; // Environmental Conditions
    let showAirQualityHelp = false; // New toggle for Air Quality
    let showEquipmentHelp = false; // Equipment Recommendations
    let showScoreHelp = false; // Score Calculation Breakdown
    let showForecast = false;

    // Unit preferences from Windy
    let tempUnit: 'C' | 'F' = 'C';
    let windUnit: 'kmh' | 'ms' | 'mph' | 'kt' = 'kmh';
    let distanceUnit: 'metric' | 'imperial' = 'metric';

    // Language preferences
    let currentLanguage: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' = 'en';

    // Translations
    const translations = {
        en: {
            excellent: 'EXCELLENT',
            good: 'GOOD',
            fair: 'FAIR',
            poor: 'POOR',
            stayHome: 'STAY HOME',
            yes: 'YES',
            no: 'NO',
            low: 'LOW',
            critical: 'CRITICAL',
            required: 'REQUIRED',
            recommended: 'Recommended',
            essential: 'Essential (High winds)',
            standardOk: 'Standard setup OK',
            immediateRisk: 'Immediate risk',
            withinHour: 'Within 1 hour',
            hours12: '1-2 hours',
            hours24: '2-4 hours',
            hours4plus: '4+ hours',
            daylight: 'Daylight',
            civilTwilight: 'Civil Twilight',
            nauticalTwilight: 'Nautical Twilight',
            astroTwilight: 'Astronomical Twilight',
            astroNight: 'Astronomical Night',
            newMoon: 'New Moon',
            waxingCrescent: 'Waxing Crescent',
            quarterMoon: 'First/Last Quarter',
            gibbous: 'Waxing/Waning Gibbous',
            fullMoon: 'Full Moon',
            belowHorizon: '(Below horizon)',
            aboveHorizon: '(Above horizon)',
            help: 'Help',
            close: 'Close',
            helpTitle: 'Astro Seeing & Transparency Guide',
            helpScore:
                'The overall score (0-100%) indicates imaging conditions. 80%+ = Excellent, 60%+ = Good, 40%+ = Fair, 20%+ = Poor.',
            helpDSO:
                'DSO Mode: Prioritizes dark skies and transparency. Moon and high clouds heavily penalize the score. Best for nebulae, galaxies, and clusters.',
            helpPlanetary:
                'Planetary Mode: Prioritizes atmospheric seeing (steadiness). Less affected by moon and clouds. Best for planets and double stars.',
            helpSeeing:
                'Seeing: Atmospheric steadiness. Affected by jet stream winds (250hPa level). Lower wind = better seeing = sharper images.',
            helpTransparency:
                'Transparency: Atmospheric clarity. Affected by clouds and humidity. Higher transparency = better contrast and fainter object visibility.',
            helpMoon:
                'Moon Phase: Use "DSO Mode" for deep sky (moon heavily penalized). Use "Planetary Mode" for moon/planets (moon ignored).',
            helpEquipment:
                'Resolution = (206.265 * PixelSize) / FocalLength. Matching resolution to seeing is key.',
            helpFocalLength:
                'Focal Length: Longer focal lengths are more sensitive to poor seeing. Adjust exposure times and autoguiding based on conditions.',
            helpWindows: 'Best observing times (Score > 70).',
            // Glossary & Help Strings
            glossaryCoords: 'Coordinates: Precise location for forecast.',
            glossaryTime: 'Time: Local and UTC time reference.',
            glossaryAstroTwilight: 'Astro Twilight: Sun < -18°. Pitch black sky needed for DSO.',
            glossaryMoonPhase:
                'Moon Phase: New Moon is best (0% illumination). Full Moon washes out DSOs.',
            glossaryJetStream:
                'Jet Stream: High altitude wind. <20m/s (70km/h) is best for sharp images.',
            glossarySeeingFWHM: 'Seeing (FWHM): Atmospheric blur in arcseconds. <2" is good.',
            glossaryCloudLayers:
                'Cloud Layers: High clouds hurt transparency most. Low clouds might be below you.',
            glossaryThermalGradient:
                'Thermal Gradient: Lapse rate. >6.5°C/km = unstable air. <6°C/km = stable.',
            glossaryPrecipWater:
                'Precipitable Water: Vapor volume. <10mm = excellent transparency. >20mm = poor.',
            glossaryStabilityIndex:
                'Stability Index: K-Index approx. <20 = stable viewing. >30 = unstable.',
            glossaryDewPointGap:
                'Dew Point Gap: Format T-Dew. <2°C puts your optics at risk of fogging.',
            glossarySurfaceWind: 'Surface Wind: >15km/h causes telescope shake/vibration.',
            glossaryHeater: 'Heater: Essential if dew point gap is <2°C.',
            glossaryMaxMag:
                'Max Magnification: Limited by seeing. Poor seeing makes high power views blurry.',
            glossaryDSOWeight:
                'DSO Weighting: Clouds (Primary), Transparency (20%), Seeing (10%), Moon Penalty.',
            glossaryPlanetaryWeight:
                'Planetary Weighting: Seeing (60%), Clouds (30%), Sun/Moon (Minor).',
            glossaryModelDisclaimer:
                'Note: Data derived from global numerical weather models (NWP). Local topography may vary.',
            // Missing Environmental Labels
            windGusts: 'Wind Gusts',
            humidity: 'Humidity',
            glossaryDust: 'Dust Mass: Concentration of dust particles. Degrades transparency.',
            glossaryCalculation: 'Calculation Logic',
            glossaryCalcDetails:
                'Score = 100% - Penalties (Clouds, Humidity >85%, Wind, PM2.5/Dust, Moon).',
            aboutTitle: 'About',
            aboutDesc: 'Advanced Astronomy seeing & transparency forecast for celestial imaging.',
            author: 'Created by',
            visitRepo: 'Source Code',
            glossaryExposure:
                'Max Exposure: Limited by wind stability. High winds shake equipment.',
            glossaryOptFL:
                'Optimal FL: High turbulence limits resolution. Use shorter focal lengths in poor seeing.',
        },
        es: {
            glossaryExposure: 'Exp. Max: Limitada por viento. Vientos fuertes mueven el equipo.',
            glossaryOptFL:
                'DF Óptima: Turbulencia limita resolución. Usa DF más corta con mal seeing.',
            aboutTitle: 'Acerca de',
            aboutDesc: 'Pronóstico avanzado de Seeing y Transparencia para astronomía.',
            author: 'Creado por',
            visitRepo: 'Código Fuente',
            excellent: 'EXCELENTE',
            good: 'BUENO',
            fair: 'REGULAR',
            poor: 'MALO',
            stayHome: 'QUÉDATE EN CASA',
            yes: 'SÍ',
            no: 'NO',
            low: 'BAJO',
            critical: 'CRÍTICO',
            required: 'REQUERIDO',
            recommended: 'Recomendado',
            essential: 'Esencial (Vientos fuertes)',
            standardOk: 'Configuración estándar OK',
            immediateRisk: 'Riesgo inmediato',
            withinHour: 'En 1 hora',
            hours12: '1-2 horas',
            hours24: '2-4 horas',
            hours4plus: '4+ horas',
            daylight: 'Luz del día',
            civilTwilight: 'Crepúsculo Civil',
            nauticalTwilight: 'Crepúsculo Náutico',
            astroTwilight: 'Crepúsculo Astronómico',
            astroNight: 'Noche Astronómica',
            newMoon: 'Luna Nueva',
            waxingCrescent: 'Cuarto Creciente',
            quarterMoon: 'Cuarto Menguante',
            gibbous: 'Gibosa Creciente/Menguante',
            fullMoon: 'Luna Llena',
            belowHorizon: '(Bajo horizonte)',
            aboveHorizon: '(Sobre horizonte)',
            help: 'Ayuda',
            close: 'Cerrar',
            helpTitle: 'Guía de Seeing Astronómico',
            helpScore:
                'El puntaje general (0-100%) indica las condiciones de imagen. 80%+ = Excelente, 60%+ = Bueno, 40%+ = Regular, 20%+ = Malo.',
            helpDSO:
                'Modo DSO: Prioriza cielos oscuros y transparencia. La luna y nubes altas penalizan mucho el puntaje. Mejor para nebulosas, galaxias y cúmulos.',
            helpPlanetary:
                'Modo Planetario: Prioriza el seeing atmosférico (estabilidad). Menos afectado por luna y nubes. Mejor para planetas y estrellas dobles.',
            helpSeeing:
                'Seeing: Estabilidad atmosférica. Afectado por vientos de corriente en chorro (nivel 250hPa). Menos viento = mejor seeing = imágenes más nítidas.',
            helpTransparency:
                'Transparencia: Claridad atmosférica. Afectada por nubes y humedad. Mayor transparencia = mejor contraste y visibilidad de objetos débiles.',
            helpMoon:
                'Impacto Lunar: Varía según el tipo de DSO. Las nebulosas (con filtros) se afectan menos. Las galaxias se afectan mucho. Planifica en luna nueva para mejores resultados.',
            helpFocalLength:
                'Distancia Focal: Distancias focales largas son más sensibles al mal seeing. Ajusta tiempos de exposición y autoguiado según condiciones.',
            helpWindows:
                'Ventanas de Observación: Muestran períodos óptimos con horarios de inicio/fin, duración y hora pico. Barras verdes indican períodos buenos.',
        },
        fr: {
            excellent: 'EXCELLENT',
            good: 'BON',
            fair: 'MOYEN',
            poor: 'MAUVAIS',
            stayHome: 'RESTE CHEZ TOI',
            yes: 'OUI',
            no: 'NON',
            low: 'FAIBLE',
            critical: 'CRITIQUE',
            required: 'REQUIS',
            recommended: 'Recommandé',
            essential: 'Essentiel (Vents forts)',
            standardOk: 'Configuration standard OK',
            immediateRisk: 'Risque immédiat',
            withinHour: 'Dans 1 heure',
            hours12: '1-2 heures',
            hours24: '2-4 heures',
            hours4plus: '4+ heures',
            daylight: 'Jour',
            civilTwilight: 'Crépuscule Civil',
            nauticalTwilight: 'Crépuscule Nautique',
            astroTwilight: 'Crépuscule Astronomique',
            astroNight: 'Nuit Astronomique',
            newMoon: 'Nouvelle Lune',
            waxingCrescent: 'Croissant',
            quarterMoon: 'Premier/Dernier Quartier',
            gibbous: 'Gibbeuse',
            fullMoon: 'Pleine Lune',
            belowHorizon: '(Sous horizon)',
            aboveHorizon: '(Au-dessus horizon)',
        },
        de: {
            excellent: 'AUSGEZEICHNET',
            good: 'GUT',
            fair: 'MÄSSIG',
            poor: 'SCHLECHT',
            stayHome: 'ZU HAUSE BLEIBEN',
            yes: 'JA',
            no: 'NEIN',
            low: 'NIEDRIG',
            critical: 'KRITISCH',
            required: 'ERFORDERLICH',
            recommended: 'Empfohlen',
            essential: 'Wesentlich (Starke Winde)',
            standardOk: 'Standard-Setup OK',
            immediateRisk: 'Sofortiges Risiko',
            withinHour: 'Innerhalb 1 Stunde',
            hours12: '1-2 Stunden',
            hours24: '2-4 Stunden',
            hours4plus: '4+ Stunden',
            daylight: 'Tageslicht',
            civilTwilight: 'Bürgerliche Dämmerung',
            nauticalTwilight: 'Nautische Dämmerung',
            astroTwilight: 'Astronomische Dämmerung',
            astroNight: 'Astronomische Nacht',
            newMoon: 'Neumond',
            waxingCrescent: 'Zunehmende Sichel',
            quarterMoon: 'Erstes/Letztes Viertel',
            gibbous: 'Zunehmender/Abnehmender Mond',
            fullMoon: 'Vollmond',
            belowHorizon: '(Unter Horizont)',
            aboveHorizon: '(Über Horizont)',
        },
        it: {
            excellent: 'ECCELLENTE',
            good: 'BUONO',
            fair: 'DISCRETO',
            poor: 'SCARSO',
            stayHome: 'RESTA A CASA',
            yes: 'SÌ',
            no: 'NO',
            low: 'BASSO',
            critical: 'CRITICO',
            required: 'RICHIESTO',
            recommended: 'Raccomandato',
            essential: 'Essenziale (Venti forti)',
            standardOk: 'Configurazione standard OK',
            immediateRisk: 'Rischio immediato',
            withinHour: 'Entro 1 ora',
            hours12: '1-2 ore',
            hours24: '2-4 ore',
            hours4plus: '4+ ore',
            daylight: 'Luce del giorno',
            civilTwilight: 'Crepuscolo Civile',
            nauticalTwilight: 'Crepuscolo Nautico',
            astroTwilight: 'Crepuscolo Astronomico',
            astroNight: 'Notte Astronomica',
            newMoon: 'Luna Nuova',
            waxingCrescent: 'Falce Crescente',
            quarterMoon: 'Primo/Ultimo Quarto',
            gibbous: 'Gibbosa Crescente/Calante',
            fullMoon: 'Luna Piena',
            belowHorizon: '(Sotto orizzonte)',
            aboveHorizon: '(Sopra orizzonte)',
        },
        pt: {
            excellent: 'EXCELENTE',
            good: 'BOM',
            fair: 'REGULAR',
            poor: 'RUIM',
            stayHome: 'FIQUE EM CASA',
            yes: 'SIM',
            no: 'NÃO',
            low: 'BAIXO',
            critical: 'CRÍTICO',
            required: 'NECESSÁRIO',
            recommended: 'Recomendado',
            essential: 'Essencial (Ventos fortes)',
            standardOk: 'Configuração padrão OK',
            immediateRisk: 'Risco imediato',
            withinHour: 'Em 1 hora',
            hours12: '1-2 horas',
            hours24: '2-4 horas',
            hours4plus: '4+ horas',
            daylight: 'Luz do dia',
            civilTwilight: 'Crepúsculo Civil',
            nauticalTwilight: 'Crepúsculo Náutico',
            astroTwilight: 'Crepúsculo Astronômico',
            astroNight: 'Noite Astronômica',
            newMoon: 'Lua Nova',
            waxingCrescent: 'Lua Crescente',
            quarterMoon: 'Quarto Crescente/Minguante',
            gibbous: 'Gibosa Crescente/Minguante',
            fullMoon: 'Lua Cheia',
            belowHorizon: '(Abaixo horizonte)',
            aboveHorizon: '(Acima horizonte)',
        },
    };

    // Weather data
    let windSpeed250 = 0; // km/h (Jet Stream at 200-300hPa)
    let windGusts = 0; // km/h (Surface gusts)
    let humidity = 0; // % (Relative Humidity)
    let highClouds = 0; // Estimated from RH at 200-300hPa
    let midClouds = 0; // Estimated from RH at 500hPa
    let lowClouds = 0; // Estimated from RH at 850hPa
    let totalCloudCover = 0; // Maximum of all cloud layers (reactive)
    let temperature = 10;
    let dewPoint = 5;

    // Advanced atmospheric data for scientific accuracy
    let thermalGradient = 0; // °C/km - Lapse rate affects seeing
    let precipitableWater = 0; // mm - Affects transparency
    let stabilityIndex = 0; // Atmospheric stability (negative = unstable = bad seeing)
    let surfacePressure = 1013; // hPa - For altitude calculations

    // Air Quality (CAMS)
    let aod = -1; // -1 means unavailable
    let pm25 = 0;
    let dust = -1; // Dust mass
    let hasAirQuality = false;

    let scoreReasons: string[] = []; // Reasons for the current score being low

    // Store full meteogram data for hourly/forecast calculations
    // Includes lat/lon to know when cache is stale
    let meteogramCache: {
        hours: number[];
        data: any;
        lat: number;
        lon: number;
    } | null = null;

    // Cache for Air Quality (CAMS)
    let airQualityCache: {
        hours: number[];
        data: any;
        lat: number;
        lon: number;
    } | null = null;

    // Astronomical data
    let moonAltitude = 0;
    let moonIllumination = 0;
    let sunAltitude = 0;

    // Calculated scores
    let seeingScore = 0;
    let transparencyScore = 0;
    let overallScore = 0;
    let isDarkSky = false;
    let dewRisk: 'low' | 'critical' = 'low';

    // Current location and time
    let currentLat = 50.0;
    let currentLon = 14.0;
    let currentTime = new Date();

    // Forecast data
    let forecastData: Array<{
        date: string;
        score: number;
        moonIllum: number;
        status: string;
        sunAlt: number;
        moonAlt: number;
        viewingWindow?: {
            start: string;
            end: string;
            duration: string;
            bestHour: string;
        };
    }> = [];

    // Hourly data for current day
    let hourlyData: Array<{
        hour: string;
        score: number;
        status: string;
        sunAlt: number;
        moonAlt: number;
        isGoodViewing: boolean;
    }> = [];

    let showHourly = false;
    let showHelp = false;

    let weatherDataInterval: number;
    let astronomyInterval: number;
    let mapMoveTimeout: number;

    export const onopen = (_params: unknown) => {
        // Plugin opened
    };

    function calculateSeeingScore(
        windSpeed: number,
        focalLength: number,
        gusts: number = 0,
        thermalGrad: number = 0,
    ): number {
        // 1. Jet Stream (Base Score)
        // < 20 m/s (~70 km/h) is ideal. > 50 m/s (~180 km/h) is poor.
        let baseScore: number;
        if (windSpeed < 70) {
            baseScore = 100 - (windSpeed / 70) * 10; // 100-90
        } else if (windSpeed < 120) {
            baseScore = 90 - ((windSpeed - 70) / 50) * 20; // 90-70
        } else if (windSpeed < 180) {
            baseScore = 70 - ((windSpeed - 120) / 60) * 30; // 70-40
        } else {
            baseScore = Math.max(0, 40 - ((windSpeed - 180) / 100) * 40); // <40
        }

        // 2. Surface Turbulence (Gusts)
        // Gusts > 15 km/h shake telescopes. > 40 km/h is unusable.
        let gustPenalty = 0;
        if (gusts > 15) {
            gustPenalty = Math.min(50, (gusts - 15) * 1.5);
        }

        // 3. Thermal Instability (Lapse Rate)
        // > 6.5°C/km is unstable.
        let thermalPenalty = 0;
        if (thermalGrad > 6.5) {
            thermalPenalty = Math.min(20, (thermalGrad - 6.5) * 10);
        }

        // 4. Optical Sensitivity (Resolution Sampling)
        // High resolution (low arcsec/pixel) is punished more by seeing
        const resolution = (206.265 * pixelSize) / focalLength;

        // Estimate Seeing FWHM based on wind
        // Wind < 10m/s ~ 1.5", Wind > 40m/s ~ 4.0"
        const estimatedSeeing = 1.5 + (windSpeed250 / 40) * 2.5;

        let samplingPenalty = 0;
        // If system resolves better than seeing supports (oversampling)
        if (resolution < estimatedSeeing) {
            // Ratio of mismatch. e.g. Seeing 3.0" / Res 1.0" = 3x blur
            // Penalty scales with wind and high magnification
            samplingPenalty = Math.min(25, (estimatedSeeing / resolution - 1) * 8);
        }

        // Aperture penalty (Larger aperture = more sensitive to cells)
        // > 150mm starts penalty in bad wind
        let aperturePenalty = 0;
        if (aperture > 150 && windSpeed250 > 20) {
            aperturePenalty = Math.min(10, (aperture - 150) * 0.05);
        }

        return Math.max(
            0,
            Math.min(
                100,
                baseScore - gustPenalty - thermalPenalty - samplingPenalty - aperturePenalty,
            ),
        );
    }

    function calculateTransparencyScore(
        highClouds: number,
        midClouds: number,
        lowClouds: number,
        humidity: number = 0,
        pwv: number = 0,
        aod: number = 0,
        pm25: number = 0,
    ): number {
        // 1. Clouds (Weighted) - High clouds scatter light most
        const cloudPenalty = highClouds * 0.8 + midClouds * 0.6 + lowClouds * 0.4;

        // 2. Surface Humidity (Haze/Fog risk)
        let rhPenalty = 0;
        if (humidity > 85) {
            rhPenalty = (humidity - 85) * 2; // Up to 30% penalty at 100% RH
        }

        // 3. Precipitable Water (Atmospheric Moisture Column)
        // > 20mm degrades transparency for fainter DSOs
        let pwvPenalty = 0;
        if (pwv > 20) {
            pwvPenalty = (pwv - 20) * 0.5;
        }

        // 4. Aerosol Optical Depth (AOD)
        // Extinction by dust/smoke
        // 0.05 Excellent, 0.3 Fair, 0.5 Poor
        let aodPenalty = 0;
        if (aod > 0.05) {
            aodPenalty = Math.min(30, (aod - 0.05) * 60);
        }

        // 5. PM2.5 (Smoke/Pollution)
        // < 5 Excellent, > 35 Poor
        let pmPenalty = 0;
        if (pm25 > 5) {
            pmPenalty = Math.min(20, (pm25 - 5) * 0.5);
        }

        let score = 100 - cloudPenalty - rhPenalty - pwvPenalty - aodPenalty - pmPenalty;
        return Math.max(0, score);
    }

    function calculateDSOScore(): number {
        let score = 100;
        let reasons: string[] = [];

        // 1. Sun Altitude (Critical)
        if (sunAltitude > -12) {
            return 5; // Stay Home (Daytime)
        } else if (sunAltitude > -18) {
            score -= (sunAltitude + 18) * 5;
            reasons.push(`Twilight penalty: -${((sunAltitude + 18) * 5).toFixed(0)}`);
        }

        // 2. Cloud Cover (Critical)
        const effectiveCloudCover = Math.max(highClouds, midClouds * 0.9, lowClouds * 0.8);
        if (effectiveCloudCover > 0) {
            const penalty = effectiveCloudCover * 0.8;
            score -= penalty;
            reasons.push(`Cloud penalty (${effectiveCloudCover}%): -${penalty.toFixed(0)}`);
        }

        // 3. Moon Factor
        if (moonAltitude > 0) {
            const moonFactor = moonIllumination * (0.3 + (Math.max(0, moonAltitude) / 90) * 0.7);
            let moonPenalty = 0;
            switch (dsoType) {
                case 'nebula':
                    moonPenalty = moonFactor * 25;
                    break;
                case 'galaxy':
                    moonPenalty = moonFactor * 50;
                    break;
                case 'cluster':
                    moonPenalty = moonFactor * 30;
                    break;
            }
            score -= moonPenalty;
            reasons.push(
                `Moon penalty (${(moonIllumination * 100).toFixed(0)}%): -${moonPenalty.toFixed(0)}`,
            );
        }

        // 4. Seeing & Transparency
        const seeingContribution = seeingScore * 0.2;
        const transparencyContribution = transparencyScore * 0.2;
        score = score * 0.6 + seeingContribution + transparencyContribution;

        return Math.max(5, Math.min(100, score));
    }

    function calculatePlanetaryScore(): number {
        let score = 100;

        // === PRIMARY FACTORS FOR PLANETARY ===

        // 1. Seeing is KING for planetary (60% weight)
        score = seeingScore * 0.6;

        // 2. But clouds still matter (30% weight) - no point if cloudy
        const effectiveCloudCover = Math.max(highClouds, midClouds, lowClouds);
        score += (100 - effectiveCloudCover) * 0.3;

        // 3. Sun altitude matters less (can image planets at dusk/dawn)
        if (sunAltitude > 0) {
            // Daytime - Venus/Moon can still be imaged
            score -= 20;
        } else if (sunAltitude > -6) {
            // Civil twilight - acceptable for bright planets
            score -= 10;
        }
        // Nighttime bonus
        if (sunAltitude < -12) {
            score += 10;
        }

        return Math.max(5, Math.min(100, score));
    }

    function calculateOverallScore(): number {
        if (imagingMode === 'dso') {
            return calculateDSOScore();
        } else {
            return calculatePlanetaryScore();
        }
    }

    function calculateDarkSky(): boolean {
        return sunAltitude < -18;
    }

    function calculateDewRisk(temp: number, dewPt: number): 'low' | 'critical' {
        const gap = temp - dewPt;
        return gap < 2 ? 'critical' : 'low';
    }

    function getStatusText(score: number): string {
        if (score >= 80) return t('excellent');
        if (score >= 60) return t('good');
        if (score >= 40) return t('fair');
        if (score >= 20) return t('poor');
        return t('stayHome');
    }

    function getStatusClass(score: number): string {
        if (score >= 80) return 'excellent';
        if (score >= 60) return 'good';
        if (score >= 40) return 'fair';
        if (score >= 20) return 'poor';
        return 'terrible';
    }

    function getSeeingClass(score: number): string {
        if (score >= 70) return 'good';
        if (score >= 40) return 'fair';
        return 'poor';
    }

    function getTransparencyClass(score: number): string {
        if (score >= 70) return 'good';
        if (score >= 40) return 'fair';
        return 'poor';
    }

    function getDarkSkyClass(isDark: boolean): string {
        return isDark ? 'good' : 'poor';
    }

    // Unit conversion functions - Using Windy's metrics system for user preferences
    function formatTemperature(tempC: number, showBoth: boolean = false): string {
        // Convert from Celsius to Kelvin for Windy's converter (Windy uses Kelvin internally)
        const tempK = tempC + 273.15;
        const converted = metrics.temp.convertValue(tempK);
        if (showBoth) {
            // Show both Celsius and Fahrenheit regardless of user preference
            const tempF = (tempC * 9) / 5 + 32;
            return `${tempC.toFixed(1)}°C / ${tempF.toFixed(1)}°F`;
        }
        return converted;
    }

    function formatWindSpeed(kmh: number): string {
        // Convert from km/h to m/s for Windy's converter (Windy uses m/s internally)
        const ms = kmh / 3.6;
        return metrics.wind.convertValue(ms);
    }

    function getWindSpeedUnit(): string {
        return metrics.wind.metric;
    }

    function detectLanguageFromBrowser(): 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' {
        const locale = navigator.language || 'en-US';
        if (locale.startsWith('es')) return 'es';
        if (locale.startsWith('fr')) return 'fr';
        if (locale.startsWith('de')) return 'de';
        if (locale.startsWith('it')) return 'it';
        if (locale.startsWith('pt')) return 'pt';
        return 'en';
    }

    function t(key: keyof typeof translations.en): string {
        return translations[currentLanguage][key] || translations.en[key];
    }

    function updateUnitsFromWindy() {
        // Detect language first
        currentLanguage = detectLanguageFromBrowser();
        console.log('Detected language:', currentLanguage);

        try {
            if (store && store.get) {
                // Get temperature units
                const tempUnits = store.get('tempUnits');
                if (tempUnits) {
                    tempUnit = tempUnits === 'F' ? 'F' : 'C';
                    console.log('Temperature unit from Windy:', tempUnit);
                }

                // Get wind units
                const windUnits = store.get('windUnits');
                if (windUnits) {
                    windUnit = windUnits;
                    console.log('Wind unit from Windy:', windUnit);
                }

                // Get distance/measurement system
                const units = store.get('units');
                if (units) {
                    distanceUnit = units === 'imperial' ? 'imperial' : 'metric';
                    console.log('Distance unit from Windy:', distanceUnit);
                }
            }
        } catch (e) {
            console.log('Could not get unit preferences from Windy:', e);
            // Detect from browser locale as fallback
            const locale = navigator.language || 'en-US';
            if (locale.includes('US')) {
                tempUnit = 'F';
                windUnit = 'mph';
                distanceUnit = 'imperial';
                console.log('Using US units as fallback');
            } else if (locale.includes('GB')) {
                tempUnit = 'C';
                windUnit = 'mph';
                distanceUnit = 'imperial';
                console.log('Using UK units as fallback');
            } else {
                tempUnit = 'C';
                windUnit = 'kmh';
                distanceUnit = 'metric';
                console.log('Using metric units as fallback');
            }
        }
    }

    function getTwilightPhase(sunAlt: number): string {
        if (sunAlt > -0.833) return t('daylight');
        if (sunAlt > -6) return t('civilTwilight');
        if (sunAlt > -12) return t('nauticalTwilight');
        if (sunAlt > -18) return t('astroTwilight');
        return t('astroNight');
    }

    function getTwilightClass(sunAlt: number): string {
        if (sunAlt > -12) return 'poor-value';
        if (sunAlt > -18) return 'fair-value';
        return 'good-value';
    }

    function getMoonPhase(illumination: number): string {
        if (illumination < 0.02) return t('newMoon');
        if (illumination < 0.25) return t('waxingCrescent');
        if (illumination < 0.75) return t('quarterMoon');
        if (illumination < 0.98) return t('gibbous');
        return t('fullMoon');
    }

    function getSeeingEstimate(windSpeed: number): string {
        if (windSpeed < 20) return '1.5-2.5" (Excellent)';
        if (windSpeed < 35) return '2.5-3.5" (Good)';
        if (windSpeed < 50) return '3.5-4.5" (Fair)';
        if (windSpeed < 70) return '4.5-6" (Poor)';
        return '>6" (Very Poor)';
    }

    function getTotalCloudCover(): number {
        // Return the reactive variable (updated when cloud layers change)
        return totalCloudCover;
    }

    function updateTotalCloudCover(): void {
        // Use maximum cloud layer - if any layer has thick clouds, you can't see through it
        totalCloudCover = Math.max(highClouds, midClouds, lowClouds);
    }

    function getRelativeHumidity(temp: number, dewPt: number): number {
        const es = 6.112 * Math.exp((17.67 * temp) / (temp + 243.5));
        const e = 6.112 * Math.exp((17.67 * dewPt) / (dewPt + 243.5));
        return Math.min(100, (e / es) * 100);
    }

    function getDewFormationTime(temp: number, dewPt: number): string {
        const gap = temp - dewPt;
        if (gap < 1) return t('immediateRisk');
        if (gap < 2) return t('withinHour');
        if (gap < 3) return t('hours12');
        if (gap < 5) return t('hours24');
        return t('hours4plus');
    }

    function getRecommendedExposure(windSpeed: number, focalLength: number): string {
        const baseExposure = windSpeed < 30 ? 300 : windSpeed < 50 ? 180 : 120;
        const flFactor = focalLength > 1000 ? 0.7 : focalLength > 500 ? 0.85 : 1.0;
        const recommended = Math.round(baseExposure * flFactor);
        return `${recommended}s (max recommended)`;
    }

    function getOptimalFocalLength(windSpeed: number): string {
        if (windSpeed < 25) return '< 2000mm (All FL OK)';
        if (windSpeed < 40) return '< 1200mm (Avoid long FL)';
        if (windSpeed < 60) return '< 600mm (Short FL only)';
        return '< 300mm (Wide field only)';
    }

    function getMoonImpact(): number {
        if (moonAltitude <= 0) return 0;

        let impact = 0;
        switch (dsoType) {
            case 'nebula':
                impact = moonIllumination * 20;
                break;
            case 'galaxy':
                impact = moonIllumination * 50;
                break;
            case 'cluster':
                impact = moonIllumination * 35;
                break;
        }
        return Math.round(impact);
    }

    function calculateHourlyScoreForTime(date: Date): number {
        const sunPos = SunCalc.getPosition(date, currentLat, currentLon);
        const moonPos = SunCalc.getMoonPosition(date, currentLat, currentLon);
        const moonIllum = SunCalc.getMoonIllumination(date);

        const sunAlt = sunPos.altitude * (180 / Math.PI);
        const moonAlt = moonPos.altitude * (180 / Math.PI);

        // Get REAL weather data from meteogram cache instead of simulating
        let hourWindSpeed = windSpeed250; // Fallback to current values
        let hourHighClouds = highClouds;
        let hourMidClouds = midClouds;
        let hourLowClouds = lowClouds;

        if (meteogramCache && meteogramCache.hours.length > 0) {
            const targetTs = date.getTime();

            // Find the closest time index in meteogram data
            let closestIndex = 0;
            let minDiff = Infinity;
            meteogramCache.hours.forEach((ts, i) => {
                const diff = Math.abs(ts - targetTs);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestIndex = i;
                }
            });

            const meteoData = meteogramCache.data;

            // Get wind at 200hPa (Jet Stream) for this hour
            const windU =
                meteoData['wind_u-200h']?.[closestIndex] ??
                meteoData['wind_u-300h']?.[closestIndex] ??
                0;
            const windV =
                meteoData['wind_v-200h']?.[closestIndex] ??
                meteoData['wind_v-300h']?.[closestIndex] ??
                0;
            hourWindSpeed = Math.sqrt(windU * windU + windV * windV) * 3.6;

            // Get cloud cover from relative humidity
            const rhHigh =
                meteoData['rh-200h']?.[closestIndex] ?? meteoData['rh-300h']?.[closestIndex] ?? 0;
            const rhMid = meteoData['rh-500h']?.[closestIndex] ?? 0;
            const rhLow = meteoData['rh-850h']?.[closestIndex] ?? 0;

            // Convert RH to cloud cover (RH > 40% starts forming clouds, > 70% = significant)
            hourHighClouds =
                rhHigh > 70
                    ? Math.min(100, (rhHigh - 40) * 1.67)
                    : rhHigh > 40
                      ? (rhHigh - 40) * 1.67
                      : 0;
            hourMidClouds =
                rhMid > 70
                    ? Math.min(100, (rhMid - 40) * 1.67)
                    : rhMid > 40
                      ? (rhMid - 40) * 1.67
                      : 0;
            hourLowClouds =
                rhLow > 70
                    ? Math.min(100, (rhLow - 40) * 1.67)
                    : rhLow > 40
                      ? (rhLow - 40) * 1.67
                      : 0;
        }

        // Calculate seeing and transparency scores using REAL data
        const seeingScoreHour = calculateSeeingScore(hourWindSpeed, focalLength);
        const transparencyScoreHour = calculateTransparencyScore(
            hourHighClouds,
            hourMidClouds,
            hourLowClouds,
        );

        // Calculate overall score based on mode
        let score = 100;

        if (imagingMode === 'dso') {
            // DSO mode calculations - clouds are the main factor
            score -= hourHighClouds * 0.8;
            score -= hourMidClouds * 0.6;
            score -= hourLowClouds * 0.5;

            // Moon penalty
            if (moonAlt > 0) {
                let moonPenalty = 0;
                switch (dsoType) {
                    case 'nebula':
                        moonPenalty = moonIllum.fraction * 20;
                        break;
                    case 'galaxy':
                        moonPenalty = moonIllum.fraction * 50;
                        break;
                    case 'cluster':
                        moonPenalty = moonIllum.fraction * 35;
                        break;
                }
                score -= moonPenalty;
            }

            // Sun altitude penalty
            if (sunAlt > -18) {
                score -= (sunAlt + 18) * 5;
            }

            // Transparency contribution
            score = score * 0.7 + transparencyScoreHour * 0.3;
        } else {
            // Planetary mode - seeing is king
            score = seeingScoreHour;
        }

        return Math.max(0, Math.min(100, score));
    }

    function findViewingWindow(date: Date): {
        start: string;
        end: string;
        duration: string;
        bestHour: string;
    } | null {
        const scores: Array<{ hour: number; score: number; time: Date }> = [];

        // For 7-day forecast, still check the full day (00:00 to 23:00)
        // This gives a complete picture of the viewing window for trip planning
        for (let hour = 0; hour < 24; hour++) {
            const testTime = new Date(date);
            testTime.setHours(hour, 0, 0, 0);

            const score = calculateHourlyScoreForTime(testTime);
            scores.push({ hour, score, time: testTime });
        }

        // Find continuous good periods (score >= 40)
        const goodHours = scores.filter(s => s.score >= 40);

        if (goodHours.length === 0) return null;

        // Find the longest continuous period
        let bestStart = goodHours[0];
        let bestEnd = goodHours[0];
        let bestScore = goodHours[0].score;
        let longestDuration = 1;

        let currentStart = goodHours[0];
        let currentDuration = 1;

        for (let i = 1; i < goodHours.length; i++) {
            if (goodHours[i].hour === goodHours[i - 1].hour + 1) {
                // Continue current streak
                currentDuration++;
            } else {
                // New streak - check if previous was longer
                if (currentDuration > longestDuration) {
                    longestDuration = currentDuration;
                    bestStart = currentStart;
                    bestEnd = goodHours[i - 1];
                }
                currentStart = goodHours[i];
                currentDuration = 1;
            }
        }

        // Check final streak
        if (currentDuration > longestDuration) {
            bestStart = currentStart;
            bestEnd = goodHours[goodHours.length - 1];
            longestDuration = currentDuration;
        }

        // Find the best single hour within the window
        const bestHourData = scores.reduce((best, current) =>
            current.score > best.score ? current : best,
        );

        return {
            start: String(bestStart.hour).padStart(2, '0') + ':00',
            end: String(bestEnd.hour + 1).padStart(2, '0') + ':00',
            duration: `${longestDuration}h`,
            bestHour: String(bestHourData.hour).padStart(2, '0') + ':00',
        };
    }

    function generateHourlyForecast() {
        hourlyData = [];

        // Use the current timeline time from Windy, not system time
        const baseDate = new Date(currentTime);

        // Start from the current selected hour (round down to nearest hour)
        const startTime = new Date(baseDate);
        startTime.setMinutes(0, 0, 0);

        console.log('Generating 24-hour forecast starting from:', startTime.toISOString());

        for (let i = 0; i < 24; i++) {
            const hourTime = new Date(startTime);
            hourTime.setHours(startTime.getHours() + i);

            const score = calculateHourlyScoreForTime(hourTime);
            const sunPos = SunCalc.getPosition(hourTime, currentLat, currentLon);
            const moonPos = SunCalc.getMoonPosition(hourTime, currentLat, currentLon);

            // Determine if this is today, tomorrow, etc.
            const now = new Date();
            const isCurrentHour = Math.abs(hourTime.getTime() - baseDate.getTime()) < 3600000; // Within 1 hour
            const daysDiff = Math.floor((hourTime.getTime() - now.getTime()) / (24 * 3600000));

            let timeLabel = hourTime.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
            });

            // Add day indicator for clarity
            if (daysDiff > 0) {
                timeLabel += ` (+${daysDiff}d)`;
            } else if (daysDiff < 0) {
                timeLabel += ` (${daysDiff}d)`;
            }

            hourlyData.push({
                hour: timeLabel,
                score: Math.round(score),
                status: getStatusText(score),
                sunAlt: sunPos.altitude * (180 / Math.PI),
                moonAlt: moonPos.altitude * (180 / Math.PI),
                isGoodViewing: score >= 40,
            });
        }

        console.log(
            'Hourly forecast generated: 24 hours starting from',
            startTime.toLocaleString('es-ES'),
        );
    }

    function generateForecast() {
        forecastData = [];
        const baseDate = currentTime; // Use current selected time as base

        console.log('Generating realistic forecast from:', baseDate.toISOString());

        for (let i = 0; i < 7; i++) {
            const forecastDate = new Date(baseDate);
            forecastDate.setDate(baseDate.getDate() + i);
            forecastDate.setHours(23, 0, 0, 0); // Check at 11 PM each day

            const moonIllum = SunCalc.getMoonIllumination(forecastDate);
            const sunPos = SunCalc.getPosition(forecastDate, currentLat, currentLon);
            const moonPos = SunCalc.getMoonPosition(forecastDate, currentLat, currentLon);

            const sunAlt = sunPos.altitude * (180 / Math.PI);
            const moonAlt = moonPos.altitude * (180 / Math.PI);

            // Use calculateHourlyScoreForTime which uses REAL meteogram data
            // This ensures consistency between current, hourly, and 7-day forecasts
            const score = calculateHourlyScoreForTime(forecastDate);

            console.log(
                `Day ${i}: Score ${score.toFixed(0)}% (Moon ${(moonIllum.fraction * 100).toFixed(0)}%)`,
            );

            // Find viewing window for this day
            const viewingWindow = findViewingWindow(forecastDate);

            forecastData.push({
                date: forecastDate.toLocaleDateString('es-ES', {
                    weekday: 'short',
                    month: '2-digit',
                    day: '2-digit',
                }),
                score: Math.round(score),
                moonIllum: moonIllum.fraction,
                status: getStatusText(score),
                sunAlt: sunAlt,
                moonAlt: moonAlt,
                viewingWindow: viewingWindow ?? undefined,
            });
        }

        const avgScore =
            forecastData.reduce((sum, day) => sum + day.score, 0) / forecastData.length;
        console.log(`Forecast complete - Average score: ${avgScore.toFixed(1)}%`);
    }

    function updateAstronomicalData() {
        let targetTime = new Date();

        // Use official Windy store API to get timestamp
        try {
            if (store && store.get) {
                const windyTimestamp = store.get('timestamp');
                if (windyTimestamp) {
                    targetTime = new Date(windyTimestamp);
                    console.log(
                        `Using Windy timestamp for calculations: ${targetTime.toISOString()}`,
                    );
                }
            }
        } catch (e) {
            console.log('Using current time for astronomical calculations:', e);
        }

        // Update currentTime consistently
        currentTime = targetTime;

        // Calculate astronomical positions using SunCalc
        const sunPos = SunCalc.getPosition(targetTime, currentLat, currentLon);
        const moonPos = SunCalc.getMoonPosition(targetTime, currentLat, currentLon);
        const moonIllum = SunCalc.getMoonIllumination(targetTime);

        sunAltitude = sunPos.altitude * (180 / Math.PI);
        moonAltitude = moonPos.altitude * (180 / Math.PI);
        moonIllumination = moonIllum.fraction;

        isDarkSky = calculateDarkSky();

        console.log('Astronomical data updated:', {
            time: targetTime.toISOString(),
            location: `${currentLat.toFixed(3)}, ${currentLon.toFixed(3)}`,
            sun: `${sunAltitude.toFixed(1)}°`,
            moon: `${moonAltitude.toFixed(1)}° (${(moonIllumination * 100).toFixed(0)}%)`,
            darkSky: isDarkSky,
        });

        updateScores();
    }

    function updateScores() {
        seeingScore = calculateSeeingScore(windSpeed250, focalLength, windGusts, thermalGradient);
        transparencyScore = calculateTransparencyScore(
            highClouds,
            midClouds,
            lowClouds,
            humidity,
            precipitableWater,
            aod,
            pm25,
        );
        overallScore = calculateOverallScore();
        dewRisk = calculateDewRisk(temperature, dewPoint);
    }

    async function fetchAirQuality(lat: number, lon: number) {
        try {
            // Check cache validity
            if (
                airQualityCache &&
                Math.abs(airQualityCache.lat - lat) < 0.001 &&
                Math.abs(airQualityCache.lon - lon) < 0.001
            ) {
                // Already cached, just refresh if we have data
                if (hasAirQuality) refreshWeatherDataFromCache();
                return;
            }

            // Request CAMS model specifically for Air Quality using Point Forecast
            // Meteogram endpoint often ignores specific parameter requests
            const result = await getPointForecastData(
                'cams' as any,
                {
                    lat,
                    lon,
                    step: 3, // CAMS usually has 3h steps
                },
                {
                    p: 'aod550,pm2p5', // specific parameters
                },
            );

            if (!result || !result.data) {
                hasAirQuality = false;
                airQualityCache = null;
                return;
            }

            // NOTE: PointForecastData structure might differ slightly from Meteogram
            // Usually result.data contains the properties directly or nested.
            // Let's inspect what we got.
            console.log('CAMS Point Forecast Keys:', Object.keys(result.data));

            // Try to extract data.
            // result.data might contain 'aod550' array directly if using getPointForecastData
            const dataHash = result.data as any;

            // Sometimes data is nested in 'data' prop depending on wrapper versions
            const actualData = dataHash.data || dataHash;

            // Allow AOD or PM2.5 to be sufficient
            if (!actualData['aod550'] && !actualData['pm2p5']) {
                console.warn(
                    'CAMS data missing required keys (aod550, pm2p5). Got:',
                    Object.keys(actualData),
                );
                hasAirQuality = false;
                return;
            }

            airQualityCache = {
                // Point forecast might not have 'hours' array if it's compact?
                // Usually it has 'ts' or 'hours'. If not, we map from somewhere else?
                // Standard Windy PointForecast has 'ts' array.
                hours: actualData.ts || actualData.hours,
                data: actualData,
                lat,
                lon,
            };

            if (!airQualityCache.hours) {
                console.warn('CAMS data missing timestamp (ts/hours).');
                hasAirQuality = false;
                return;
            }

            hasAirQuality = true;
            console.log('Air Quality (CAMS) cached successfully via PointForecast.');

            // Trigger update to use the new data
            refreshWeatherDataFromCache();
        } catch (e) {
            console.warn('Air Quality fetch failed:', e);
            hasAirQuality = false;
            airQualityCache = null;
        }
    }

    function updateWeatherData() {
        // Store previous location to detect changes
        const prevLat = currentLat;
        const prevLon = currentLon;

        // 1. Determine the target location
        // Priority: picker (user clicked) > map center (user is viewing)
        let newLat = currentLat;
        let newLon = currentLon;
        let sourceUsed = 'none';

        // Try picker first (user clicked/tapped somewhere)
        if (picker && (picker as any).getParams) {
            const pickerParams = (picker as any).getParams();
            if (pickerParams && pickerParams.lat !== undefined) {
                newLat = pickerParams.lat;
                newLon = pickerParams.lon;
                sourceUsed = 'picker';
            }
        }

        // If no picker, use map center
        if (sourceUsed === 'none' && map && map.getCenter) {
            const center = map.getCenter();
            if (center) {
                newLat = center.lat;
                newLon = center.lng;
                sourceUsed = 'map';
            }
        }

        // Check if location actually changed (more than ~100m)
        const locationChanged =
            Math.abs(newLat - prevLat) > 0.001 || Math.abs(newLon - prevLon) > 0.001;

        if (locationChanged) {
            currentLat = newLat;
            currentLon = newLon;
            console.log(
                `Location changed (${sourceUsed}): ${currentLat.toFixed(3)}, ${currentLon.toFixed(3)}`,
            );

            // Invalidate old cache since location changed
            meteogramCache = null;
            airQualityCache = null; // Also clear CAMS cache
        } else {
            // Location didn't change.
            // If we have cache, just refresh for current time and return.
            // This avoids spamming API on redundant calls.
            if (meteogramCache) {
                refreshWeatherDataFromCache();
                return;
            }
        }

        // 2. Fetch COMPLETE atmospheric data using Windy's Meteogram API
        // This gives us EVERYTHING we need:
        // - Jet Stream wind at 200hPa/300hPa altitude
        // - Temperature and dewpoint at surface
        // - Relative Humidity at multiple levels (for accurate cloud estimation!)

        // Get the user's selected weather model from Windy (respects user's choice!)
        // But only if it's a valid forecast model (not satellite, radar, etc.)
        const validModels = [
            'ecmwf',
            'ecmwfAnalysis',
            'ecmwfWaves',
            'ecmwfAifs',
            'gfs',
            'gfsWaves',
            'icon',
            'iconD2',
            'iconEu',
            'iconWaves',
            'nam',
            'namConus',
            'namAlaska',
            'namHawaii',
            'hrrr',
            'hrrrAlaska',
            'arome',
            'aromeAntilles',
            'aromeReunion',
            'ukv',
            'cmc',
            'cmcGem',
            'mblue',
            'nems',
            'naefs',
        ];

        const rawProduct = store.get('product') || 'ecmwf';
        const selectedModel = validModels.includes(rawProduct) ? rawProduct : 'ecmwf';

        if (rawProduct !== selectedModel) {
            console.log(
                `Product "${rawProduct}" is not a forecast model, using "${selectedModel}" instead`,
            );
        } else {
            console.log('Using weather model:', selectedModel);
        }

        console.log('Fetching weather model:', selectedModel);

        getMeteogramForecastData(selectedModel as any, {
            lat: currentLat,
            lon: currentLon,
            step: 3,
        })
            .then(meteogramResponse => {
                // Check valid response
                if (meteogramResponse && meteogramResponse.data && meteogramResponse.data.data) {
                    const meteoData = meteogramResponse.data.data as any;

                    // Cache the response
                    if (meteoData.hours && Array.isArray(meteoData.hours)) {
                        meteogramCache = {
                            hours: meteoData.hours,
                            data: meteoData,
                            lat: currentLat,
                            lon: currentLon,
                        };
                        console.log(
                            `Meteogram cached for ${currentLat.toFixed(3)}, ${currentLon.toFixed(3)}`,
                        );

                        refreshWeatherDataFromCache();
                        fetchAirQuality(currentLat, currentLon);
                    }
                }

                // Point forecast is now only used as backup if meteogram fails
                // (meteogram has all the data we need)

                updateScores();

                // Regenerate forecasts now that we have REAL meteogram data
                // This ensures 24-hour and 7-day forecasts use actual weather data
                generateHourlyForecast();
                generateForecast();

                console.log('Forecasts regenerated with real meteogram data');
            })
            .catch(err => {
                console.error('Failed to fetch weather data:', err);
                updateScores();
            });

        if (locationChanged) {
            updateAstronomicalData();
            // generateForecast is now called inside the meteogram callback above
        }
    }

    function refreshWeatherDataFromCache() {
        if (!meteogramCache) return;

        // Get current time from store
        let targetTimeMs = Date.now();
        try {
            if (store && store.get) {
                targetTimeMs = store.get('timestamp');
            }
        } catch (e) {}

        const hours = meteogramCache.hours;
        // Find closest index
        let closestIndex = 0;
        let minDiff = Infinity;
        hours.forEach((ts, i) => {
            const diff = Math.abs(ts - targetTimeMs);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        });

        const meteoData = meteogramCache.data;
        const meteoTimeIndex = closestIndex;

        // 1. Wind 250 (Jet Stream)
        const windU =
            meteoData['wind_u-250h']?.[meteoTimeIndex] ??
            meteoData['wind_u-300h']?.[meteoTimeIndex] ??
            0;
        const windV =
            meteoData['wind_v-250h']?.[meteoTimeIndex] ??
            meteoData['wind_v-300h']?.[meteoTimeIndex] ??
            0;
        windSpeed250 = Math.sqrt(windU * windU + windV * windV) * 3.6;

        // 2. Temp & Dew
        let temp = meteoData['temp-surface']?.[meteoTimeIndex] ?? 0;
        if (temp > 200) temp -= 273.15;
        temperature = temp;

        let dew = meteoData['dewpoint-surface']?.[meteoTimeIndex] ?? 0;
        if (dew > 200) dew -= 273.15;
        dewPoint = dew;

        // 3. Gusts & Humidity
        const gust = meteoData['gust-surface']?.[meteoTimeIndex] ?? 0;
        windGusts = gust * 3.6;

        const rhSurface = meteoData['rh-surface']?.[meteoTimeIndex];
        if (rhSurface !== undefined) {
            humidity = rhSurface;
        } else {
            const t = temperature;
            const dp = dewPoint;
            humidity =
                100 *
                (Math.exp((17.625 * dp) / (243.04 + dp)) / Math.exp((17.625 * t) / (243.04 + t)));
            if (humidity > 100) humidity = 100;
        }

        // 4. Clouds (from RH levels)
        const rhHigh =
            meteoData['rh-200h']?.[meteoTimeIndex] ?? meteoData['rh-300h']?.[meteoTimeIndex] ?? 0;
        highClouds =
            rhHigh > 70
                ? Math.min(100, (rhHigh - 40) * 1.67)
                : rhHigh > 40
                  ? (rhHigh - 40) * 1.67
                  : 0;

        const rhMid = meteoData['rh-500h']?.[meteoTimeIndex] ?? 0;
        midClouds =
            rhMid > 70 ? Math.min(100, (rhMid - 40) * 1.67) : rhMid > 40 ? (rhMid - 40) * 1.67 : 0;

        const rhLow = meteoData['rh-850h']?.[meteoTimeIndex] ?? 0;
        lowClouds =
            rhLow > 70 ? Math.min(100, (rhLow - 40) * 1.67) : rhLow > 40 ? (rhLow - 40) * 1.67 : 0;

        highClouds = Math.round(highClouds);
        midClouds = Math.round(midClouds);
        lowClouds = Math.round(lowClouds);
        updateTotalCloudCover();

        // 5. Advanced Metrics
        const temp500 = meteoData['temp-500h']?.[meteoTimeIndex];
        if (temp500) {
            const temp500C = temp500 > 200 ? temp500 - 273.15 : temp500;
            thermalGradient = (temperature - temp500C) / 5.5;
        }

        const temp850 = meteoData['temp-850h']?.[meteoTimeIndex];
        const dew850 = meteoData['dewpoint-850h']?.[meteoTimeIndex] ?? (temp850 ? temp850 - 5 : 0);
        if (temp850 && temp500 && dew850) {
            const t850 = temp850 > 200 ? temp850 - 273.15 : temp850;
            const t500 = temp500 > 200 ? temp500 - 273.15 : temp500;
            const td850 = dew850 > 200 ? dew850 - 273.15 : dew850;
            stabilityIndex = t850 - t500 + td850 - (t850 - td850);
        }

        // PWV (approx from Humidity and Temp if not in model)
        // Standard formula: PWV ~= 0.1 * RH * exp(0.06 * T)
        precipitableWater = 0.1 * humidity * Math.exp(0.06 * temperature);

        // Also update Air Quality from cache if available
        if (airQualityCache && airQualityCache.hours) {
            // Find closest index for CAMS
            let aqIndex = 0;
            let aqMinDiff = Infinity;
            airQualityCache.hours.forEach((ts, i) => {
                const diff = Math.abs(ts - targetTimeMs);
                if (diff < aqMinDiff) {
                    aqMinDiff = diff;
                    aqIndex = i;
                }
            });

            const aqData = airQualityCache.data;
            const aodVal = aqData['aod550']?.[aqIndex];
            const pm25Val = aqData['pm2p5']?.[aqIndex];
            const dustVal = aqData['chemsDustsm']?.[aqIndex];

            // Consider valid if at least one metric is present
            // Note: CAMS point forecast might return pm2p5 but not aod550
            if (aodVal !== undefined || pm25Val !== undefined || dustVal !== undefined) {
                aod = aodVal ?? -1;
                pm25 = pm25Val ?? 0;
                dust = dustVal ?? -1;
                hasAirQuality = true;
            } else {
                hasAirQuality = false;
            }
        }
        updateScores();
    }

    onMount(() => {
        // Update unit preferences from Windy
        updateUnitsFromWindy();
        // Get initial location using official Windy API
        try {
            let initialCenter = null;

            // Use official map API
            if (map && typeof map.getCenter === 'function') {
                initialCenter = map.getCenter();
                console.log('Got initial center from official map API');
            } else if (store && store.get) {
                // Fallback to store
                const storeCenter = store.get('center' as any);
                if (storeCenter) {
                    initialCenter = {
                        lat: storeCenter.lat,
                        lng: storeCenter.lon || storeCenter.lng,
                    };
                    console.log('Got initial center from store API');
                }
            }

            if (initialCenter) {
                currentLat = initialCenter.lat;
                currentLon = initialCenter.lng;
                console.log(`Initial location: ${currentLat.toFixed(3)}, ${currentLon.toFixed(3)}`);
            }

            // Set up map event listeners using official API
            if (map && typeof map.on === 'function') {
                console.log('Setting up official map event listeners');

                // Listen to map move events (pan/zoom)
                map.on('moveend', () => {
                    console.log('Map moveend event (official API)');
                    if (mapMoveTimeout) clearTimeout(mapMoveTimeout);
                    mapMoveTimeout = window.setTimeout(() => {
                        // Update both astronomical and weather data when map moves
                        updateAstronomicalData();
                        updateWeatherData();
                    }, 500);
                });

                // Listen to map click events (when user clicks a specific location)
                map.on('click', (e: any) => {
                    if (e && e.latlng) {
                        console.log(
                            `Map click at: ${e.latlng.lat.toFixed(3)}, ${e.latlng.lng.toFixed(3)}`,
                        );
                        // The picker will be set by Windy, updateWeatherData will pick it up
                        setTimeout(() => {
                            updateAstronomicalData();
                            updateWeatherData();
                        }, 100);
                    }
                });
            } else {
                console.log('Official map API not available for events');
            }

            // Set up store event listeners using official API
            if (store && typeof store.on === 'function') {
                console.log('Setting up official store event listeners');

                // Primary timestamp listener for timeline changes
                store.on('timestamp', () => {
                    console.log('Timestamp changed (official API) - updating plugin data');
                    setTimeout(() => {
                        updateAstronomicalData();
                        updateWeatherData();
                        generateForecast();
                        generateHourlyForecast();
                    }, 200);
                });

                // Listen to center changes
                store.on('center', () => {
                    console.log('Map center changed (official API)');
                    setTimeout(updateWeatherData, 200);
                });

                // Listen to time slider changes
                store.on('timestamp', () => {
                    // User moved the time slider
                    updateAstronomicalData();
                    refreshWeatherDataFromCache();
                });

                // Listen to overlay changes
                store.on('overlay', () => {
                    console.log('Overlay changed (official API) - refreshing weather data');
                    setTimeout(updateWeatherData, 300);
                });

                // Listen to level changes
                store.on('level', () => {
                    console.log('Level changed (official API) - updating data');
                    setTimeout(updateWeatherData, 200);
                });

                // Listen to product (weather model) changes - ECMWF, GFS, ICON, etc.
                store.on('product', () => {
                    const model = store.get('product');
                    console.log(`Weather model changed to: ${model} - refreshing data`);
                    setTimeout(updateWeatherData, 200);
                });

                // Listen to unit preference changes (temperature, wind)
                store.on('metric_temp', () => {
                    console.log('Temperature unit changed - updating display');
                    updateUnitsFromWindy();
                });
                store.on('metric_wind', () => {
                    console.log('Wind unit changed - updating display');
                    updateUnitsFromWindy();
                });
            } else {
                console.log('Official store API not available for events');
            }

            // Listen to broadcast events using official API
            if (bcast && typeof bcast.on === 'function') {
                console.log('Setting up official broadcast listeners');
                bcast.on('redrawFinished', () => {
                    console.log('Map redraw finished (official API) - checking for updates');
                    setTimeout(updateWeatherData, 100);
                });
            } else {
                console.log('Official broadcast API not available');
            }
        } catch (e) {
            console.log('Error setting up official Windy API integration:', e);
            console.log('Using default coordinates - plugin will work with basic functionality');
        }

        // Initial calculations
        updateAstronomicalData();
        updateWeatherData(); // This now regenerates forecasts after meteogram data loads

        // Update intervals
        astronomyInterval = window.setInterval(updateAstronomicalData, 60000); // Every minute
        weatherDataInterval = window.setInterval(updateWeatherData, 30000); // Every 30 seconds
    });

    onDestroy(() => {
        if (astronomyInterval) clearInterval(astronomyInterval);
        if (weatherDataInterval) clearInterval(weatherDataInterval);
        if (mapMoveTimeout) clearTimeout(mapMoveTimeout);

        // Clean up event listeners using official API
        try {
            if (map && map.off) {
                map.off('moveend');
                map.off('click');
                console.log('Cleaned up map event listeners');
            }
            if (store && store.off) {
                store.off('timestamp');
                store.off('center');
                store.off('overlay');
                store.off('level');
                console.log('Cleaned up store event listeners');
            }
            if (bcast && bcast.off) {
                bcast.off('redrawFinished');
                console.log('Cleaned up broadcast event listeners');
            }
        } catch (e) {
            console.log('Error cleaning up official API event listeners:', e);
        }
    });

    // Reactive statements to recalculate when inputs change
    $: if (imagingMode || dsoType || focalLength) {
        updateScores();
        generateForecast(); // Regenerate forecast when mode/type changes
        generateHourlyForecast(); // Regenerate hourly forecast when mode/type changes
    }
</script>

<style lang="less">
    .astro-plugin {
        padding: 15px;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        position: relative;
        box-sizing: border-box;
    }

    .help-section {
        text-align: right;
        margin-bottom: 15px;
    }

    .help-btn {
        background: #333;
        color: #fff;
        border: none;
        border-radius: 20px;
        padding: 8px 15px;
        font-size: 12px;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
            background: #007acc;
        }
    }

    .help-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .help-modal {
        background: #2a2a2a;
        border-radius: 12px;
        max-width: 500px;
        max-height: 80vh;
        overflow-y: auto;
        border: 2px solid #007acc;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .help-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 25px 15px;
        border-bottom: 1px solid #333;

        h3 {
            color: #fff;
            margin: 0;
            font-size: 18px;
        }
    }

    .help-close {
        background: none;
        border: none;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s;

        &:hover {
            background: #ff0000;
        }
    }

    .help-content {
        padding: 20px 25px;
    }

    .help-item {
        margin-bottom: 15px;
        color: #fff;
        line-height: 1.4;
        font-size: 13px;

        strong {
            color: #007acc;
            display: block;
            margin-bottom: 5px;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }

    .mode-selector {
        display: flex;
        margin-bottom: 20px;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid #333;
    }

    .mode-btn {
        flex: 1;
        padding: 12px 20px;
        background: #2a2a2a;
        color: #fff;
        border: none;
        cursor: pointer;
        font-weight: bold;
        transition: background 0.3s;

        &:hover {
            background: #3a3a3a;
        }

        &.active {
            background: #007acc;
        }
    }

    .dso-subcategory {
        margin-bottom: 20px;
        text-align: center;

        label {
            display: block;
            margin-bottom: 8px;
            color: #fff;
            font-weight: bold;
            font-size: 14px;
        }

        select {
            width: 100%;
            padding: 10px;
            background: #2a2a2a;
            color: #fff;
            border: 2px solid #333;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;

            &:focus {
                outline: none;
                border-color: #007acc;
            }

            option {
                background: #2a2a2a;
                color: #fff;
            }
        }
    }

    .focal-length-section {
        margin-bottom: 30px;
        text-align: center;

        label {
            display: block;
            margin-bottom: 10px;
            color: #fff;
            font-weight: bold;
        }

        .focal-slider {
            width: 100%;
            margin-bottom: 10px;
            -webkit-appearance: none;
            height: 6px;
            border-radius: 3px;
            background: #333;
            outline: none;

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #007acc;
                cursor: pointer;
            }

            &::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #007acc;
                cursor: pointer;
                border: none;
            }
        }

        .focal-value {
            color: #007acc;
            font-weight: bold;
            font-size: 16px;
        }
    }

    .score-gauge {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }

    .gauge-circle {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background: conic-gradient(from 0deg, #007acc calc(var(--percentage) * 1%), #333 0);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        &::before {
            content: '';
            position: absolute;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: #1a1a1a;
        }
    }

    .gauge-content {
        position: relative;
        z-index: 1;
        text-align: center;
    }

    .score-number {
        font-size: 36px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 5px;
    }

    .astro-status {
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;

        &.excellent {
            color: #00ff00;
        }
        &.good {
            color: #90ee90;
        }
        &.fair {
            color: #ffff00;
        }
        &.poor {
            color: #ffa500;
        }
        &.terrible {
            color: #ff0000;
        }
    }

    .metrics-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 20px;
    }

    .metric-card {
        background: #2a2a2a;
        padding: 15px;
        border-radius: 8px;
        text-align: center;
        border: 2px solid transparent;

        &.dew-warning {
            border-color: #ff0000;
            animation: pulse 2s infinite;
        }

        .metric-label {
            color: #aaa;
            font-size: 12px;
            margin-bottom: 5px;
            text-transform: uppercase;
        }

        .metric-value {
            font-size: 18px;
            font-weight: bold;

            &.good {
                color: #00ff00;
            }
            &.fair {
                color: #ffff00;
            }
            &.poor {
                color: #ff0000;
            }
        }
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    .diagnostics-toggle {
        margin-bottom: 15px;
    }

    .forecast-toggle {
        margin-bottom: 15px;
    }

    .toggle-btn {
        width: 100%;
        padding: 12px;
        background: #333;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        text-align: left;

        &:hover {
            background: #444;
        }
    }

    .diagnostics-panel {
        background: #2a2a2a;
        border-radius: 8px;
        padding: 15px;
    }

    .diagnostic-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #333;
        color: #fff;

        &:last-child {
            border-bottom: none;
        }

        span:first-child {
            color: #aaa;
            font-size: 13px;
        }

        span:last-child {
            font-weight: bold;
            font-size: 13px;
        }
    }

    .diag-section {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .diag-header {
        background: #007acc;
        color: #fff;
        padding: 8px 12px;
        font-weight: bold;
        font-size: 14px;
        border-radius: 4px;
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .good-value {
        color: #00ff00 !important;
    }

    .fair-value {
        color: #ffff00 !important;
    }

    .poor-value {
        color: #ff6666 !important;
    }

    .forecast-panel {
        background: #2a2a2a;
        border-radius: 8px;
        padding: 15px;
        margin-top: 0;
    }

    .forecast-header {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 3fr;
        gap: 10px;
        padding: 10px 0;
        border-bottom: 2px solid #007acc;
        margin-bottom: 10px;
        font-weight: bold;
        color: #fff;
        font-size: 12px;
        text-transform: uppercase;
    }

    .forecast-day {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 3fr;
        gap: 10px;
        padding: 12px 0;
        border-bottom: 1px solid #333;
        color: #fff;
        transition: background 0.3s;

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        &.good-day {
            border-left: 4px solid #00ff00;
            padding-left: 8px;
        }

        &.fair-day {
            border-left: 4px solid #ffff00;
            padding-left: 8px;
        }

        &.poor-day {
            border-left: 4px solid #ff0000;
            padding-left: 8px;
        }
    }

    .forecast-date {
        font-weight: bold;
        color: #fff;
    }

    .forecast-score {
        font-weight: bold;
        font-size: 16px;
    }

    .forecast-moon {
        color: #ccc;
    }

    .forecast-status {
        font-size: 11px;
        text-transform: uppercase;
        font-weight: bold;

        .good-day & {
            color: #00ff00;
        }
        .fair-day & {
            color: #ffff00;
        }
        .poor-day & {
            color: #ff0000;
        }
    }

    .forecast-window {
        font-size: 11px;
        line-height: 1.2;
    }

    .window-info {
        color: #aaa;
        font-size: 9px;
    }

    .no-window {
        color: #666;
        font-style: italic;
    }

    .hourly-toggle {
        margin-bottom: 15px;
    }

    .hourly-panel {
        background: #2a2a2a;
        border-radius: 8px;
        padding: 15px;
        margin-top: 0;
        max-height: 400px;
        overflow-y: auto;
    }

    .hourly-header {
        display: grid;
        grid-template-columns: 1fr 1fr 2fr 1fr;
        gap: 10px;
        padding: 10px 0;
        border-bottom: 2px solid #007acc;
        margin-bottom: 10px;
        font-weight: bold;
        color: #fff;
        font-size: 12px;
        text-transform: uppercase;
        position: sticky;
        top: 0;
        background: #2a2a2a;
        z-index: 1;
    }

    .hourly-row {
        display: grid;
        grid-template-columns: 1fr 1fr 2fr 1fr;
        gap: 10px;
        padding: 8px 0;
        border-bottom: 1px solid #333;
        color: #fff;
        transition: background 0.3s;
        font-size: 12px;

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        &.good-hour {
            border-left: 3px solid #00ff00;
            padding-left: 7px;
            background: rgba(0, 255, 0, 0.05);
        }

        &.poor-hour {
            border-left: 3px solid transparent;
            padding-left: 7px;
        }
    }

    .hourly-time {
        font-weight: bold;
        color: #fff;
    }

    .hourly-score {
        font-weight: bold;
        font-size: 14px;
    }

    .hourly-status {
        font-size: 10px;
        text-transform: uppercase;
        font-weight: bold;
    }

    .hourly-conditions {
        color: #aaa;
        text-align: center;
    }

    /* Help Glossary */
    .help-glossary {
        background: #2a2a2a;
        padding: 8px;
        border-radius: 6px;
        margin-bottom: 8px;
        border: 1px solid #444;
    }

    .help-item {
        font-size: 11px;
        color: #ccc;
        margin-bottom: 4px;
        line-height: 1.3;
    }

    .help-item strong {
        color: #fff;
        font-weight: 600;
    }

    /* Score Reasons (Warnings) */
    .score-reasons {
        margin-top: 8px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
    }

    .reason-item {
        font-size: 11px;
        color: #ffcccc;
        background: rgba(255, 0, 0, 0.2);
        padding: 2px 6px;
        border-radius: 4px;
        white-space: nowrap;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Tooltip Hint REMOVED - Interactive Headers instead */

    .diag-header {
        font-size: 12px;
        text-transform: uppercase;
        color: #e6e6e6; /* Much brighter than #888, high visibility */
        margin-bottom: 10px;
        padding-bottom: 4px;
        border-bottom: 1px solid #555;

        /* New interactive style */
        cursor: pointer;
        text-decoration: underline dotted #999;
        display: flex;
        justify-content: space-between;
        font-weight: 600; /* Bold for prominence */
    }

    .diag-header:hover {
        color: #ffffff;
        text-decoration-color: #fff;
    }
</style>
