export default function ListRolesBody({ roles }: any) {
    return <ul>
        {roles.length > 0 ? roles.map((i: any, k: any) => <li>{i.name}</li>) : <p>Tidak ada roles</p>}
    </ul>
}
