<template>
  <div>
    <div class="container">
      <div class="section">
        <h1 class="title">VEP Lists</h1>
        <h2 class="subtitle">View and manage the lists of nations that should be sending or receiving aid</h2>
      </div>
    </div>
    <div class="container">
      <div class="section">
        <b-tabs>
          <b-tab-item label="Outgoing Cash" type="is-boxed">
            <div class="content">
              <h3>Message Template</h3>
              <b-field label="Carbon Copy Rulers">
                <b-input type="textarea" readonly :value="ccRulers"></b-input>
              </b-field>
              <b-field label="Subject">
                <b-input readonly value="Send VEP Cash Today!"></b-input>
              </b-field>
              <b-field label="Message">
                <b-input type="textarea" readonly :value="listMessage"></b-input>
              </b-field>
              <h3>Data</h3>
              <b-table :data="listRecipients" :columns="columns"></b-table>
            </div>
          </b-tab-item>
          <b-tab-item label="Incoming Cash">
            <b-field label="Message">
              <b-input type="textarea" disabled :value="listMessage"></b-input>
            </b-field>
            <b-table :data="listRecipients" :columns="columns"></b-table>
          </b-tab-item>
          <b-tab-item label="Outgoing Tech">
            <b-field label="Message">
              <b-input type="textarea" disabled :value="listMessage"></b-input>
            </b-field>
            <b-table :data="listRecipients" :columns="columns"></b-table>
          </b-tab-item>
          <b-tab-item label="Incoming Tech">
            <b-field label="Message">
              <b-input type="textarea" disabled :value="listMessage"></b-input>
            </b-field>
            <b-table :data="listRecipients" :columns="columns"></b-table>
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListsPage',
  data: () => ({
    listMessage: "Greetings!\r\nYou are receiving this message because you have free aid slots and are enrolled in the Valyrian Exchange Program as a tech buyer or cash donor.\r\nYou have cash debt (or are even), so please send cash!\r\nGo to: https://www.cn-vep.com/\r\nUse your unique code to log in (contact the VEP management in case you need to recover it).\r\nThank you!\r\no7",
    listRecipients: [
      { "nation": "javaswiller of swillerland", "slotsFree": 6, "credit": 0, "debt": 1, "recentActivity": 1, "discord": "javaswiller#2586" },
      { "nation": "Dan2680 of Red Army", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "SneakyDan#2355" },
      { "nation": "King Hassan of Al Maghrib", "slotsFree": 1, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "KingHassan#6112" },
      { "nation": "Lord Bane of Damasca", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "" },
      { "nation": "Judge of Kingdom of Azar", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 3, "discord": "Mraedis#8167" },
      { "nation": "Wolfprince of Azaroth", "slotsFree": 5, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "" },
      { "nation": "Lenny N Karl of Mudfoot", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "" },
      { "nation": "blackpony of the Mad Ninja", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "" },
      { "nation": "The Dark Lord Sauron of Land of Shadow", "slotsFree": 4, "credit": 0, "debt": 1, "recentActivity": 1, "discord": "Dark Lord Sauron [FTW]#5432" },
      { "nation": "Kaiser Willis of Kryton", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "" },
      { "nation": "pjk11 of BOOM HEADSHOT", "slotsFree": 4, "credit": 0, "debt": 0, "recentActivity": 3, "discord": "Taco#9468" },
      { "nation": "Dragon of Dragons world", "slotsFree": 0, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "Dragon#3807" },
      { "nation": "Prince Oberyn of Highgarden", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 2, "discord": "Tom Mason#4575" },
      { "nation": "32493 of Jempire", "slotsFree": 6, "credit": 0, "debt": 9, "recentActivity": 1, "discord": "" },
      { "nation": "Codark of Codainia", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "CodArk2#6844" },
      { "nation": "MrSka of Slartibartfast", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 2, "discord": "MrSka#6737" },
      { "nation": "Uncle Don of The Tannhauser Gate", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "" },
      { "nation": "Argirioc of Argiriahn", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "" },
      { "nation": "asapilu of Persianiran", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "asapilu#1933" },
      { "nation": "slmarsch of Rio Grande", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "slmarsch#3002" },
      { "nation": "BLITZ1 of BLITZKRIEG THE FIRST", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 2, "discord": "Blitz1#4506" },
      { "nation": "Thomas214 of Peepville", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "" },
      { "nation": "c0creat0r of Primerica", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "" },
      { "nation": "Gen. Danville of Gen danville", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "" },
      { "nation": "Berbers of Kingdom of AlRezana", "slotsFree": 5, "credit": 0, "debt": 27, "recentActivity": 1, "discord": "mvassall893#7811" },
      { "nation": "Master Ice of Urmalia", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 2, "discord": "" },
      { "nation": "Beowulf88 of Arcanium", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 4, "discord": "Beowulf#4300" },
      { "nation": "Pile Butts of Wobblies", "slotsFree": 3, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "Piley#7657" },
      { "nation": "McGee of J3dgar", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "Viffer#7652" },
      { "nation": "Democracy of UnitedNation", "slotsFree": 5, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "Democracy#0778" },
      { "nation": "azntrigboi of Symmetry", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "" },
      { "nation": "Stoopid Ace of Smokehaven", "slotsFree": 0, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "Stoopid Ace#4609" },
      { "nation": "Morshu of Koridai", "slotsFree": 6, "credit": 0, "debt": 18, "recentActivity": 1, "discord": "" },
      { "nation": "Lord Emperor Clot of Clotvania", "slotsFree": 4, "credit": 0, "debt": 18, "recentActivity": 1, "discord": "LordEmperorClot#1818" },
      { "nation": "Ollie Williams of Kolob", "slotsFree": 6, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "Oily Whale Yams#0522" },
      { "nation": "rheebrosinc of SwagJuice", "slotsFree": 4, "credit": 0, "debt": 9, "recentActivity": 1, "discord": "SwagJuice#0590" },
      { "nation": "Greatest Mothers of Femocratic Lands", "slotsFree": 6, "credit": 0, "debt": 9, "recentActivity": 1, "discord": "" },
      { "nation": "Sycora of Sycorax", "slotsFree": 4, "credit": 0, "debt": 0, "recentActivity": 1, "discord": "" },
    ],
    columns: [
      { field: 'nation', label: 'Nation' },
      { field: 'slotsFree', label: 'Slots Free' },
      { field: 'credit', label: 'Credit' },
      { field: 'debt', label: 'Debt' },
      { field: 'recentActivity', label: 'Activity' },
      { field: 'discord', label: 'Discord Tag' }
    ]
  }),
  computed: {
    ccRulers() {
      return this.listRecipients.map(row => row.nation).join("\r\n");
    }
  }
}
</script>